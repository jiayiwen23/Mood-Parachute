import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { colors } from "../colors";
import PressableButton from "../components/PressableButton";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";
import { getDownloadURL, ref } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { database, storage } from "../firebase/firebaseSetup";

import {
  updateUserAvatarInDB,
  deleteUserAvatarInDB,
  uploadImageToStorage,
} from "../firebase/firebaseHelper";
import ImageManager from "../components/ImageManager";

export default function ProfileScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [takenAvatar, setTakenAvatar] = useState(null); // URL to the user's avatar image in the cloud storage (Firebase Storage)

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
          <ImageManager passImageUri={handleImageUri}>
            {takenAvatar ? (
              <Image source={{ uri: takenAvatar }} style={styles.avatarImage} />
            ) : (
              <MaterialIcons
                name="account-circle"
                size={60}
                color={colors.border}
              />
            )}
          </ImageManager>
        </View>
        <PressableButton
          pressedFunction={handleDeleteAvatar}
          pressedStyle={styles.pressedStyle}
          defaultStyle={styles.defaultStyle}
        >
          <Text style={styles.buttonText}>Delete Avatar</Text>
        </PressableButton>
      </View>

      <PressableButton
        pressedFunction={handleLogout}
        pressedStyle={styles.pressedStyle}
        defaultStyle={styles.defaultStyle}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </PressableButton>

      <Image source={require("../assets/map.jpg")} style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  userInfo: {
    marginVertical: 20,
  },
  userPhoto: {
    position: "absolute",
    top: 20,
    right: 40,
    justifyContent: "flex-end",
  },
  body: {
    fontSize: 20,
    marginLeft: 10,
    padding: 10,
  },
  button: {
    fontSize: 25,
    alignSelf: "center",
    padding: 10,
    color: colors.border,
    fontWeight: "bold",
    textAlign: "center",
  },
  map: {
    alignSelf: "center",
    marginTop: 20,
    width: "90%",
    height: "65%",
  },
  buttonText: {
    fontSize: 22,
    textAlign: "center",
    color: colors.buttonText,
  },
  defaultStyle: {
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: colors.button,
    width: "28%",
    padding: 10,
    alignSelf: "center",
  },
  pressedStyle: {
    backgroundColor: colors.buttonPressed,
  },
  avatarImage: {
    height: 80,
    width: 80,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.border,
  },
});
