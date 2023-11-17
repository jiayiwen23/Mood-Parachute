import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Modal,
  Dimensions,
} from "react-native";
import PressableButton from "../components/PressableButton";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { writeToDB } from "../firebase/firebaseHelper";

const windowWidth = Dimensions.get("window").width;

export default function AddEntryScreen({ navigation }) {
  const [text, setText] = useState("");
  const [moodIcon, setMoodIcon] = useState("mood");
  const textInputRef = useRef(null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  const openKeyboard = () => {
    textInputRef.current.focus();
  };

  const sendHandler = () => {
    const now = new Date();
    const entry = {
      journal: text,
      date: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
    };
    console.log(entry);
    writeToDB(entry);
    Keyboard.dismiss();
    navigation.goBack();
  };

  const addMoonHandler = (iconName) => {
    setMoodIcon(iconName);
    setShowMoodSelector(false);
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
          <PressableButton
            defaultStyle={styles.toolbarButton}
            pressedFunction={() => setShowMoodSelector(true)}
          >
            {moodIcon === "mood" ? (
              <MaterialIcons name={moodIcon} size={24} color="black" />
            ) : (
              <AntDesign name={moodIcon} size={24} color="black" />
            )}
          </PressableButton>
          <PressableButton defaultStyle={styles.toolbarButton}>
            <AntDesign name="picture" size={24} color="black" />
          </PressableButton>
          <PressableButton defaultStyle={styles.toolbarButton}>
            <Entypo name="location-pin" size={24} color="black" />
          </PressableButton>
        </View>
        <View style={{ flex: 1 }}>
          <PressableButton
            pressedFunction={sendHandler}
            defaultStyle={{ margin: 10, alignSelf: "flex-end" }}
          >
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
      <Modal
        visible={showMoodSelector}
        transparent={true}
        onRequestClose={() => setShowMoodSelector(false)}
      >
        <View style={styles.moodSelector}>
          <PressableButton pressedFunction={() => addMoonHandler("smileo")}>
            <AntDesign name="smileo" size={24} color="black" />
          </PressableButton>
          <PressableButton pressedFunction={() => addMoonHandler("meho")}>
            <AntDesign name="meho" size={24} color="black" />
          </PressableButton>
          <PressableButton pressedFunction={() => addMoonHandler("frowno")}>
            <AntDesign name="frowno" size={24} color="black" />
          </PressableButton>
        </View>
      </Modal>
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
  toolbarButton: {
    margin: 10,
  },
  moodSelector: {
    flex: 1,
    position: "absolute",
    width: windowWidth,
    bottom: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "tomato",
  },
});
