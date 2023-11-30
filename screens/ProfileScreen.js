import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../colors";
import PressableButton from "../components/PressableButton";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";

export default function ProfileScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setEmail(currentUser.email || "N/A");

      const fetchUserData = async () => {
        const userDocRef = doc(database, "users", currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUserName(userDocSnapshot.data().userName || "N/A");
        }
      };

      fetchUserData();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.body}>User Name: {userName}</Text>
        <Text style={styles.body}>Email: {email}</Text>
        <Image
          source={require("../assets/favicon.png")}
          style={styles.userPhoto}
        />
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
    width: 50,
    height: 50,
    position: "absolute",
    top: 20,
    right: 40,
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
});
