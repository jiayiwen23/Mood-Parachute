import { View, Alert, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import PressableButton from "./PressableButton";
import { AntDesign } from "@expo/vector-icons";

export default function ImageManager({ passImageUri }) {
  const [imageUri, setImageUri] = useState("");
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    const response = await requestPermission();
    return response.granted;
  };

  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission Denied",
          "You need to grant camera permission to use this app.",
          [{ text: "Okay" }]
        );
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      console.log(result);
      setImageUri(result.assets[0].uri);
      passImageUri(result.assets[0].uri);
    } catch (error) {
      console.log("take image error", error);
    }
  };

  return (
    <View>
      <PressableButton pressedFunction={takeImageHandler}>
        <AntDesign name="picture" size={24} color="black" />
      </PressableButton>
    </View>
  );
}
