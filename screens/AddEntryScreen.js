import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PressableButton from "../components/PressableButton";

export default function AddEntryScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AddEntryScreen</Text>
      <PressableButton
        pressedFunction={() => navigation.navigate("All Journal")}
      >
        <Text>back</Text>
      </PressableButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
