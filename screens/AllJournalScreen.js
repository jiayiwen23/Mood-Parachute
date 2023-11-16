import { Image, SafeAreaView } from "react-native";
import React from "react";
import Weekdays from "../components/Weekdays";
import EntriesList from "../components/EntriesList";

export default function AllJournalScreen() {
  const sampleEntries = [
    {
      id: 1,
      time: "12:22:11 ",
      text: "This is a sample entry text.",
      image: (
        <Image
          source={require("../assets/favicon.png")}
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      id: 2,
      time: "18:21:11 ",
      text: "This is another sample entry text.",
    },
  ];

  return (
    <SafeAreaView>
      <Weekdays></Weekdays>
      <EntriesList entries={sampleEntries} />
    </SafeAreaView>
  );
}
