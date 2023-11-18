import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import EntryItem from "./EntryItem";
import { database } from "../firebase/firebaseSetup";
import { collection, onSnapshot } from "firebase/firestore";

const EntriesList = ({ navigation, year, month }) => {
  const [journals, setJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "entries"),
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          console.log("data", data);
          newArray.push({ ...docSnap.data(), id: docSnap.id });
        });
        setJournals(newArray);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [year, month]);

  useEffect(() => {
    const filteredJournals = journals.filter((journal) => {
      const datePart = journal.date.split(" ")[0];
      const entryYear = parseInt(datePart.split("-")[0]);
      const entryMonth = parseInt(datePart.split("-")[1]);
      return entryYear === year && entryMonth === month;
    });
    setFilteredJournals(filteredJournals);
  }, [journals, year, month]);

  return (
    <View>
      <FlatList
        data={filteredJournals}
        renderItem={({ item }) => (
          <EntryItem entry={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default EntriesList;
