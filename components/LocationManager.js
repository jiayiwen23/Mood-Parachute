import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";

import PressableButton from "./PressableButton";

export default function LocationManager({ children, passLocation }) {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);

  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    const response = await requestPermission();
    return response.granted;
  };

  const getLocation = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission Denied",
          "You need to grant location access to use this feature.",
          [{ text: "Okay" }]
        );
      }
      const locationObject = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationObject.coords.latitude,
        longitude: locationObject.coords.longitude,
      });
      console.log(location);
    } catch (error) {
      console.log("get location error", error);
    }
  };

  return (
    <PressableButton
      pressedFunction={getLocation}
      pressedStyle={styles.pressedStyle}
      defaultStyle={styles.defaultStyle}
    >
      {children}
    </PressableButton>
  );
}
