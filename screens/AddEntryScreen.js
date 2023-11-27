import React, { useState, useRef } from "react";
import {
  Image,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Modal,
  Dimensions,
  Alert,
} from "react-native";
import PressableButton from "../components/PressableButton";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { updateToDB, writeToDB } from "../firebase/firebaseHelper";
import { colors } from "../colors";
import ImageManager from "../components/ImageManager";

const windowWidth = Dimensions.get("window").width;
const angryIcon = require("../assets/angry.png");
const happyIcon = require("../assets/happy.png");
const sadIcon = require("../assets/sad.png");
const devilIcon = require("../assets/devil.png");
const illIcon = require("../assets/ill.png");
const laughtocryIcon = require("../assets/laughtocry.png");
const loveIcon = require("../assets/love.png");
const reallyhappyIcon = require("../assets/reallyhappy.png");

// Add Entry screen is reused as Edit screen by conditional rendering
export default function AddEntryScreen({ navigation, route }) {
  const [text, setText] = useState(route.params?.entry?.journal || "");
  const [moodIcon, setMoodIcon] = useState(route.params?.entry?.mood || null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const isEditMode = route.params && route.params.entry;
  const textInputRef = useRef(null);

  const sendHandler = () => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const formattedTime = now.toTimeString().split(" ")[0].slice(0, -3);
    const entry = {
      journal: text,
      date: `${formattedDate} ${formattedTime}`,
      mood: moodIcon,
    };
    console.log(entry);
    writeToDB(entry);
    Keyboard.dismiss();
    navigation.goBack();
  };

  const addMoonHandler = (moodImage) => {
    setMoodIcon(moodImage);
    setShowMoodSelector(false);
  };

  const editHandler = () => {
    Alert.alert("Important", "Are you sure you want to save the changes?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Save",
        onPress: () => {
          const now = new Date();
          const formattedDate = now.toISOString().split("T")[0];
          const formattedTime = now.toTimeString().split(" ")[0].slice(0, -3);
          const updatedEntry = {
            journal: text,
            date: `${formattedDate} ${formattedTime}`,
            mood: moodIcon,
          };
          console.log(updatedEntry);
          updateToDB(route.params.entry.id, updatedEntry);
          Keyboard.dismiss();
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={40}
    >
      <View style={styles.overlay} />
      <View style={styles.toolbar}>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <PressableButton
            defaultStyle={styles.toolbarButton}
            pressedFunction={() => setShowMoodSelector(true)}
          >
            {moodIcon && typeof moodIcon === "number" ? (
              <Image source={moodIcon} style={{ width: 24, height: 24 }} />
            ) : (
              <Image source={happyIcon} style={{ width: 24, height: 24 }} />
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
            pressedFunction={isEditMode ? editHandler : sendHandler}
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
          <PressableButton pressedFunction={() => addMoonHandler(happyIcon)}>
            <Image source={happyIcon} style={styles.moodIcon} />
          </PressableButton>
          <PressableButton pressedFunction={() => addMoonHandler(loveIcon)}>
            <Image source={loveIcon} style={styles.moodIcon} />
          </PressableButton>
          <PressableButton pressedFunction={() => addMoonHandler(sadIcon)}>
            <Image source={sadIcon} style={styles.moodIcon} />
          </PressableButton>
          <PressableButton
            pressedFunction={() => addMoonHandler(reallyhappyIcon)}
          >
            <Image source={reallyhappyIcon} style={styles.moodIcon} />
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
    backgroundColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    textAlignVertical: "top",
    fontSize: 20,
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
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "lightblue",
    padding: 10,
  },
  moodIcon: {
    width: 30,
    height: 30,
  },
});
