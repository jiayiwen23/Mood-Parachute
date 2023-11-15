import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AllJournalScreen from "./screens/AllJournalScreen";
import Weekdays from "./components/Weekdays";

export default function App() {
  return (
    <AllJournalScreen>
      <Weekdays></Weekdays>
    </AllJournalScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
