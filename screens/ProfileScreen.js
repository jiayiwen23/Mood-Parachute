import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { colors } from "../colors";
import PressableButton from "../components/PressableButton";

export default function ProfileScreen({ navigation }) {
  
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.body}>User Name: </Text>
        <Text style={styles.body}>Email: </Text>
        <Image
          source={require("../assets/favicon.png")}
          style={styles.userPhoto}
        />
      </View>

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
});
