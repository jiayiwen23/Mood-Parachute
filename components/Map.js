import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState, useRef } from "react";
import { auth, database } from "../firebase/firebaseSetup";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { colors } from "../colors";

export default function Map() {
  const mapRef = useRef(null);
  const [journalLocations, setJournalLocations] = useState([]);
  const [initialRegion, setInitialRegion] = useState({
    // set the initial region to Vancouver. Ideally, this should be the user's current location.
    latitude: 49.2827,
    longitude: -123.1207,
    latitudeDelta: 0.25,
    longitudeDelta: 0.3,
  });

  useEffect(() => {
    const q = query(
      collection(database, "entries"),
      where("user", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let locations = {};

        querySnapshot.docs.forEach((docSnap) => {
          const journal = docSnap.data();
          if (journal.location.length === 0) return;
          const locationKey = `${journal.location[0]}`;
          //console.log(locationKey);
          if (!locations[locationKey]) {
            locations[locationKey] = {
              latitude: journal.location[1].latitude,
              longitude: journal.location[1].longitude,
              count: 1,
            };
          } else {
            locations[locationKey].count++;
            console.log("count", locations[locationKey].count);
          }
        });
        const locationsArray = Object.keys(locations).map(
          (locationKey) => locations[locationKey]
        );
        setJournalLocations(locationsArray);
        if (locationsArray.length > 0) {
          const mostEntriesLocation = locationsArray.reduce((prev, current) => {
            return prev.count > current.count ? prev : current;
          });
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: mostEntriesLocation.latitude,
              longitude: mostEntriesLocation.longitude,
              latitudeDelta: 0.25,
              longitudeDelta: 0.3,
            });
          }
        }
      },
      (err) => {
        console.log(err);
        if (err.code === "permission-denied") {
          Alert.alert("You don't have permission.");
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={initialRegion}>
        {journalLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={`${location.count} stories`}
            //description={`You have ${location.count} journal at this location.`}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 300,
    alignSelf: "center",
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
