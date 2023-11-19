import { StyleSheet } from "react-native";
import AppNavigator from "./navigations/AppNavigator";
import AidCard from "./screens/cardDetail/AidCard";

export default function App() {
  return <AidCard />;
}//<AppNavigator></AppNavigator>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
