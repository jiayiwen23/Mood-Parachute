import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../colors";
import PressableButton from "../components/PressableButton";
import { signOut } from "firebase/auth";
import { auth, database, storage } from "../firebase/firebaseSetup";
import { doc, getDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { deleteAvatarToDB, updateAvatarToDB } from "../firebase/firebaseHelper";

export default function ProfileScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarURL, setAvatarURL] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setEmail(currentUser.email || "N/A");

      const fetchUserData = async () => {
        const userDocRef = doc(database, "users", currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUserName(userDocSnapshot.data().userName || "N/A");
          const userAvatar = userDocSnapshot.data().avatar || null;
          console.log(userAvatar);
          setAvatar(userAvatar);

          // Fetch and set the avatar URL if available
          if (userAvatar) {
            const avatarURL = await getDownloadURL(ref(storage, userAvatar));
            setAvatarURL(avatarURL);
          }
        }
      };

      fetchUserData();
    }
  }, [avatar]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleChangeAvatar = async () => {
    openImagePickerAsync();
  };

  const getImageBlob = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (err) {
      console.log("fetch image ", err);
    }
  };

  const openImagePickerAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);

      let uri = result.assets[0].uri;
      let imgBlob = await getImageBlob(uri);
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = await ref(storage, `images/${imageName}`);
      uploadBytes(imageRef, imgBlob)
        .then((snapshot) => {
          console.log("Uploaded a blob!", snapshot);
          updateAvatarToDB(auth.currentUser.uid, `images/${imageName}`)
        })
        .catch((err) => {
          console.log("err = ", err);
        });
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatarToDB(auth.currentUser.uid);
  
      // Set the avatar and avatar URL to null in the state
      setAvatar(null);
      setAvatarURL(null);
    } catch (error) {
      console.error("Delete avatar error:", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.body}>User Name: {userName}</Text>
        <Text style={styles.body}>Email: {email}</Text>

        <View style={styles.userPhoto}>
          <PressableButton
            pressedFunction={handleChangeAvatar}
          >
            {avatarURL ? (
              <Image source={{ uri: avatarURL }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>Photo</Text>
              </View>
            )}
          </PressableButton>
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
    top: 10,
    right: 30,
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
  avatarPlaceholder: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
