import { Image, StyleSheet } from "react-native";
import TabNabigator from "./navigations/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import CardsScreen from "./screens/CardsScreen";
import EntryItem from "./components/EntryItem";
import EntriesList from "./components/EntriesList";
import AppNavigator from "./navigations/AppNavigator";

export default function App() {
  return <AppNavigator></AppNavigator>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
