import { View, Text } from "react-native";
import React from "react";
import UserCardsList from "../components/UserCardsList";

export default function UserCardsScreen({ navigation }) {
  return <UserCardsList navigation={navigation} />;
}
