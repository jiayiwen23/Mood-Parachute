import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import PressableButton from "../components/PressableButton";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function AddEntryScreen() {
  const [text, setText] = useState("");
  const textInputRef = useRef(null);

  const openKeyboard = () => {
    textInputRef.current.focus();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <View style={styles.overlay} />
      <View style={styles.toolbar}>
        <View
          style={{
            flex: 3,
            //backgroundColor: "tomato",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <PressableButton defaultStyle={{ margin: 10 }}>
            <MaterialIcons name="mood" size={24} color="black" />
          </PressableButton>
          <PressableButton defaultStyle={{ margin: 10 }}>
            <AntDesign name="picture" size={24} color="black" />
          </PressableButton>
          <PressableButton defaultStyle={{ margin: 10 }}>
            <Entypo name="location-pin" size={24} color="black" />
          </PressableButton>
        </View>
        <View style={{ flex: 1 }}>
          <PressableButton defaultStyle={{ margin: 10, alignSelf: "flex-end" }}>
            <Feather name="send" size={24} color="black" />
          </PressableButton>
        </View>
      </View>
      <TextInput
        ref={textInputRef}
        style={styles.input}
        placeholder="Enter your thoughts here..."
        multiline
        onChangeText={setText}
        value={text}
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#ddd", // or any color you want for the toolbar background
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});
