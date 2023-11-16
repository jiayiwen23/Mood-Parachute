import { Image, SafeAreaView } from "react-native";
import React from "react";
import Weekdays from "../components/Weekdays";
import EntriesList from "../components/EntriesList";

export default function AllJournalScreen() {
  return (
    <SafeAreaView>
      <Weekdays></Weekdays>
      <EntriesList />
    </SafeAreaView>
  );
}
