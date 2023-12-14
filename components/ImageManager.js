import { View, Alert } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import PressableButton from "./PressableButton";

export default function ImageManager({
  passImageUri,
  children,
  defaultStyle,
  pressedStyle,
}) {
  const [imageUri, setImageUri] = useState("");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    const response = await requestPermission();
    return response.granted;
  };

  const pickImageHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission Denied",
          "You need to grant library access to use this feature.",
          [{ text: "Okay" }]
        );
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
      //console.log(result);
      setImageUri(result.assets[0].uri);
      passImageUri(result.assets[0].uri);
    } catch (error) {
      console.log("pick image error", error);
    }
  };

  return (
    <View>
      <PressableButton
        defaultStyle={defaultStyle}
        pressedStyle={pressedStyle}
        pressedFunction={pickImageHandler}
      >
        {children}
      </PressableButton>
    </View>
  );
}
