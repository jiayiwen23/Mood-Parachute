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
  Text,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import PressableButton from "../components/PressableButton";
import {
  updateToDB,
  writeToDB,
  uploadImageToStorage,
} from "../firebase/firebaseHelper";
import { colors } from "../colors";
import ImageManager from "../components/ImageManager";
import CameraManager from "../components/CameraManager";
import LocationManager from "../components/LocationManager";

const windowWidth = Dimensions.get("window").width;
const loveIcon = require("../assets/1_love.png");
const laughtocryIcon = require("../assets/2_laughtocry.png");
const reallyhappyIcon = require("../assets/3_reallyhappy.png");
const happyIcon = require("../assets/4_happy.png");
const sadIcon = require("../assets/5_sad.png");
const angryIcon = require("../assets/6_angry.png");
const devilIcon = require("../assets/7_devil.png");
const illIcon = require("../assets/8_ill.png");

// Add Entry screen is reused as Edit screen by conditional rendering
export default function AddEntryScreen({ navigation, route }) {
  const [text, setText] = useState(route.params?.entry?.journal || "");
  const [moodIcon, setMoodIcon] = useState(route.params?.entry?.mood || null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const isEditMode = route.params && route.params.entry;
  const textInputRef = useRef(null);
  const [takenImageUri, setTakenImageUri] = useState(
    route.params?.entry?.image || ""
  );
  const [location, setLocation] = useState(route.params?.entry?.location || []);

  const sendHandler = async () => {
    if (!text) {
      Alert.alert("Please enter your thoughts.");
      return;
    }
    try {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const formattedTime = now.toTimeString().split(" ")[0].slice(0, -3);

      const entry = {
        journal: text,
        date: `${formattedDate} ${formattedTime}`,
        mood: moodIcon,
        image: "",
        location: location,
      };
      if (takenImageUri) {
        const uploadedImageUrl = await uploadImageToStorage(takenImageUri);
        entry.image = uploadedImageUrl;
      }
      console.log(entry);
      await writeToDB(entry);
      Keyboard.dismiss();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const addMoonHandler = (moodImage) => {
    setMoodIcon(moodImage);
    setShowMoodSelector(false);
  };

  const editHandler = async () => {
    if (!text) {
      Alert.alert("Please enter your thoughts.");
      return;
    }
    Alert.alert("Important", "Are you sure you want to save the changes?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Save",
        onPress: async () => {
          try {
            const now = new Date();
            const formattedDate = now.toLocaleDateString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            const formattedTime = now.toTimeString().split(" ")[0].slice(0, -3);
            const updatedEntry = {
              journal: text,
              date: `${formattedDate} ${formattedTime}`,
              mood: moodIcon,
              image: takenImageUri,
              location: location,
            };

            if (takenImageUri && takenImageUri !== route.params?.entry?.image) {
              const uploadedImageUrl = await uploadImageToStorage(
                takenImageUri
              );
              updatedEntry.image = uploadedImageUrl;
            }

            await updateToDB(route.params.entry.id, updatedEntry);
            Keyboard.dismiss();
            navigation.goBack();
          } catch (err) {
            console.error("Error in editHandler: ", err);
          }
        },
      },
    ]);
  };

  function passImageUri(uri) {
    // store the uri in a state variable
    setTakenImageUri(uri);
  }

  const passLocation = (location) => {
    console.log(location);
    setLocation(location);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={40}
    >
      <View style={styles.overlay}>
        {takenImageUri && (
          <Image source={{ uri: takenImageUri }} style={styles.image} />
        )}
        {location[0] && <Text>@{location[0]}</Text>}
      </View>
      <View style={styles.toolbar}>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <PressableButton
            pressedStyle={styles.pressedStyle}
            defaultStyle={styles.toolbarButton}
            pressedFunction={() => setShowMoodSelector(true)}
          >
            {moodIcon && typeof moodIcon === "number" ? (
              <Image source={moodIcon} style={{ width: 24, height: 24 }} />
            ) : (
              <Image source={happyIcon} style={{ width: 24, height: 24 }} />
            )}
          </PressableButton>
          <CameraManager
            pressedStyle={styles.pressedStyle}
            passImageUri={passImageUri}
            defaultStyle={styles.toolbarButton}
          />
          <ImageManager
            passImageUri={passImageUri}
            defaultStyle={styles.toolbarButton}
            pressedStyle={styles.pressedStyle}
          >
            <AntDesign name="picture" size={24} color="black" />
          </ImageManager>
          <LocationManager
            defaultStyle={styles.toolbarButton}
            passLocation={setLocation}
            pressedStyle={styles.pressedStyle}
          >
            <Entypo name="location-pin" size={24} color="black" />
          </LocationManager>
        </View>
        <View style={{ flex: 1 }}>
          <PressableButton
            pressedFunction={isEditMode ? editHandler : sendHandler}
            defaultStyle={{ margin: 10, alignSelf: "flex-end" }}
            pressedStyle={styles.pressedStyle}
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
          <PressableButton pressedFunction={() => addMoonHandler(loveIcon)}>
            <Image source={loveIcon} style={styles.moodIcon} />
          </PressableButton>
          <PressableButton
            pressedFunction={() => addMoonHandler(laughtocryIcon)}
          >
            <Image source={laughtocryIcon} style={styles.moodIcon} />
          </PressableButton>
          <PressableButton
            pressedFunction={() => addMoonHandler(reallyhappyIcon)}
          >
            <Image source={reallyhappyIcon} style={styles.moodIcon} />
          </PressableButton>

          <PressableButton pressedFunction={() => addMoonHandler(happyIcon)}>
            <Image source={happyIcon} style={styles.moodIcon} />
          </PressableButton>

          <PressableButton pressedFunction={() => addMoonHandler(sadIcon)}>
            <Image source={sadIcon} style={styles.moodIcon} />
          </PressableButton>
          <PressableButton pressedFunction={() => addMoonHandler(angryIcon)}>
            <Image source={angryIcon} style={styles.moodIcon} />
          </PressableButton>
          <PressableButton pressedFunction={() => addMoonHandler(devilIcon)}>
            <Image source={devilIcon} style={styles.moodIcon} />
          </PressableButton>
          <PressableButton pressedFunction={() => addMoonHandler(illIcon)}>
            <Image source={illIcon} style={styles.moodIcon} />
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
    paddingTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 18,
  },
  moodSelector: {
    flex: 1,
    position: "absolute",
    width: windowWidth,
    bottom: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.lightBlue,
    padding: 10,
  },
  moodIcon: {
    width: 30,
    height: 30,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  toolbarButton: {
    marginRight: 20,
  },
  pressedStyle: {
    opacity: 0.5,
  },
});
