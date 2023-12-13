import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { colors } from "../colors";
import PressableButton from "../components/PressableButton";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../firebase/firebaseSetup";

import {
  updateUserAvatarInDB,
  deleteUserAvatarInDB,
  uploadImageToStorage,
} from "../firebase/firebaseHelper";
import ImageManager from "../components/ImageManager";
import Map from "../components/Map";

export default function ProfileScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [takenAvatar, setTakenAvatar] = useState(null); // URL to the user's avatar image in the cloud storage (Firebase Storage)
  const [locationNumber, setLocationNumber] = useState(0);
  const [journalNumber, setJournalNumber] = useState(0);

  const handleMapData = (locationNumber, journalNumber) => {
    setLocationNumber(locationNumber);
    setJournalNumber(journalNumber);
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setEmail(currentUser.email || "N/A");
    }
    const getUserData = async () => {
      try {
        const userDocRef = doc(database, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();
        setUserName(userData.userName);
        setTakenAvatar(userData.avatar);
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };
    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleImageUri = async (uri) => {
    try {
      const avatarUrl = await uploadImageToStorage(uri);
      setTakenAvatar(avatarUrl);
      await updateUserAvatarInDB(auth.currentUser.uid, avatarUrl);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await deleteUserAvatarInDB(auth.currentUser.uid);
      setTakenAvatar(null);
    } catch (error) {
      console.error("Error deleting avatar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.body}>User Name: {userName}</Text>
        <Text style={styles.body}>Email: {email}</Text>
        <View style={styles.userPhoto}>
          <View style={styles.avatarContainer}>
            <ImageManager
              passImageUri={handleImageUri}
              pressedStyle={styles.pressedStyle}
            >
              {takenAvatar ? (
                <Image
                  source={{ uri: takenAvatar }}
                  style={styles.avatarImage}
                />
              ) : (
                <MaterialIcons
                  name="account-circle"
                  size={70}
                  color={colors.border}
                />
              )}
            </ImageManager>
          </View>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <PressableButton
          pressedFunction={handleLogout}
          pressedStyle={styles.pressedStyle}
          defaultStyle={styles.defaultStyle}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </PressableButton>

        <PressableButton
          pressedFunction={handleDeleteAvatar}
          pressedStyle={styles.pressedStyle}
          defaultStyle={styles.defaultStyle}
        >
          <Text style={styles.buttonText}>Delete Avatar</Text>
        </PressableButton>
      </View>
      <Map passMapData={handleMapData} />
      <Text style={styles.text}>
        My Path: {locationNumber} locations, {journalNumber} stories
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  userInfo: {
    margin: 20,
    padding: 5,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 8,
  },
  userPhoto: {
    position: "absolute",
    right: 10,
    justifyContent: "flex-end",
    paddingTop: 10,
  },
  body: {
    fontSize: 16,
    marginLeft: 10,
    padding: 10,
    color: colors.profileText,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  map: {
    alignSelf: "center",
    marginTop: 20,
    width: "90%",
    height: "65%",
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    color: colors.white,
  },
  defaultStyle: {
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: colors.border,
    padding: 10,
    alignSelf: "center",
  },
  pressedStyle: {
    opacity: 0.8,
  },
  avatarContainer: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    marginBottom: 20,
  },
  avatarImage: {
    height: 70,
    width: 70,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.border,
  },
  text: {
    paddingTop: 10,
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: colors.profileText,
  },
});
