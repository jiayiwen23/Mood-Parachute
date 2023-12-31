import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import EntryItem from "./EntryItem";
import { auth, database } from "../firebase/firebaseSetup";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const EntriesList = ({ navigation, year, month }) => {
  const [journals, setJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);

  useEffect(() => {
    const q = query(
      collection(database, "entries"),
      where("user", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          console.log("data", data);
          newArray.push({ ...docSnap.data(), id: docSnap.id });
        });
        setJournals(newArray);
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

  useEffect(() => {
    const filteredJournals = journals
      .filter((journal) => {
        const datePart = journal.date.split(" ")[0];
        const entryYear = parseInt(datePart.split("-")[0]);
        const entryMonth = parseInt(datePart.split("-")[1]);
        return entryYear === year && entryMonth === month;
      })
      .sort((a, b) => {
        return a.date > b.date ? -1 : 1;
      });
    setFilteredJournals(filteredJournals);
  }, [journals, year, month]);

  return (
    <View>
      <FlatList
        data={filteredJournals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EntryItem entry={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default EntriesList;
