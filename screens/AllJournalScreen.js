import { Image, View } from "react-native";
import React from "react";
import Weekdays from "../components/Weekdays";
import EntriesList from "../components/EntriesList";

export default function AllJournalScreen({ navigation }) {
  return (
    <View>
      <Weekdays></Weekdays>
      <EntriesList navigation={navigation} />
    </View>
  );
}
