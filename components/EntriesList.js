import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import EntryItem from "./EntryItem";
import { database } from "../firebase/firebaseSetup";
import { collection, onSnapshot } from "firebase/firestore";

const EntriesList = ({ navigation }) => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "entries"),
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.docs.forEach((docSnap) => {
          newArray.push({ ...docSnap.data(), id: docSnap.id });
        });
        setJournals(newArray);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <ScrollView bounces={false} contentContainerStyle={styles.container}>
        {journals.map((entry) => (
          <View key={entry.id}>
            <EntryItem entry={entry} navigation={navigation} />
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
