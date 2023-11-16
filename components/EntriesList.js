import { View, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import EntryItem from "./EntryItem";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { database } from "../firebase/firebaseSetup";
import { collection, onSnapshot } from "firebase/firestore";

const EntriesList = ({ entries, navigation }) => {
  const [journals, setJournals] = useState([]);
  // Use onSnapshot to listen to realtime updates in Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "entries"),
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.docs.forEach((docSnap) => {
          newArray.push({ ...docSnap.data(), id: docSnap.id });
        });
        setExpenses(newArray);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View>
      <ScrollView bounces={false} contentContainerStyle={styles.container}>
        {entries.map((entry) => (
          <View key={entry.id}>
            <EntryItem entry={entry} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default EntriesList;
