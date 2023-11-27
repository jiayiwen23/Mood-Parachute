import { View, Text, Pressable } from "react-native";
import React from "react";
import * as ImagePicker from 'expo-image-picker';

import PressableButton from "./PressableButton";
import { AntDesign } from "@expo/vector-icons";

export default function ImageManager() {
  const [imageuri, setImageuri] = useState("");
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const takeImageHandler = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
  });
      } catch (error) {
      console.log('take image error',error);
    }

  return (
    <View>
      <PressableButton>
        <AntDesign name="picture" size={24} color="black" />
      </PressableButton>
    </View>
  );
}
