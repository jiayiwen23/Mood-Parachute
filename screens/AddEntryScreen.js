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
  ActivityIndicator,
} from "react-native";
import PressableButton from "../components/PressableButton";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
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
  const [takenImageUri, setTakenImageUri] = useState(
    route.params?.entry?.image || ""
  );
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendHandler = async () => {
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
        location: "",
      };
      if (takenImageUri) {
        const uploadedImageUrl = await uploadImageToStorage(takenImageUri);
        entry.image = uploadedImageUrl;
      }
      if (location) {
        console.log(entry);
        await writeToDB(entry);
        Keyboard.dismiss();
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addMoonHandler = (moodImage) => {
    setMoodIcon(moodImage);
    setShowMoodSelector(false);
  };

  const editHandler = async () => {
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
    setLocation(location);
  };

  const passAddress = (address) => {
    setAddress(address);
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

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.border} />
        ) : (
          <Text>{address} </Text>
        )}
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
            passImageUri={passImageUri}
            defaultStyle={styles.toolbarButton}
          />
          <ImageManager
            passImageUri={passImageUri}
            defaultStyle={styles.toolbarButton}
          >
            <AntDesign name="picture" size={24} color="black" />
          </ImageManager>
          <LocationManager
            defaultStyle={styles.toolbarButton}
            passLocation={passLocation}
            passAddress={passAddress}
            passLoading={setIsLoading}
          >
            <Entypo name="location-pin" size={24} color="black" />
          </LocationManager>
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
  image: {
    width: 200,
    height: 200,
  },
  toolbarButton: {
    marginRight: 20,
  },
});
