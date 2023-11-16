import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import PressableButton from "../components/PressableButton";
import { useState } from "react";
import { colors } from "../colors";

export default function AddEntryScreen({ navigation }) {
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.journal}
        value={text}
        onChangeText={setText}
        placeholder="Write down your thoughts"
      ></TextInput>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  journal: {
    backgroundColor: colors.white,
    width: "90%",
  },
});
