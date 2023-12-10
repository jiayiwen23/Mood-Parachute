import MapView, { Marker } from "react-native-maps";

import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { colors } from "../colors";

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.6532,
          longitude: -79.3832,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 43.6532, longitude: -79.3832 }}
          title={"Toronto"}
          description={"The best city in the world!"}
        />
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
