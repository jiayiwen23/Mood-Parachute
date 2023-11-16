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
      <Text style={styles.text}>Date</Text>
      <TextInput
        style={styles.journal}
        value={text}
        onChangeText={setText}
        placeholder="Write down your thoughts"
      ></TextInput>
      <View style={styles.image}>
        <PressableButton>
          <Text>Image</Text>
        </PressableButton>
        <PressableButton style={styles.image}>
          <Text>submit</Text>
        </PressableButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  journal: {
    flex: 3,
    backgroundColor: colors.white,
    width: "90%",
  },
  text: {
    flex: 1,
    alignSelf: "flex-start",
    padding: 10,
    paddingLeft: 22,
  },
  image: { flex: 1 },
  submit: { flex: 1 },
});
