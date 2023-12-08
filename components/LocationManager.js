import { StyleSheet } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";
import { colors } from "../colors";
import PressableButton from "./PressableButton";

export default function LocationManager({
  children,
  passLocation,
  defaultStyle,
  pressedStyle,
}) {
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
      const newLocation = {
        latitude: locationObject.coords.latitude,
        longitude: locationObject.coords.longitude,
      };
      setLocation(newLocation);
      passLocation(newLocation);
      console.log(newLocation);
    } catch (error) {
      console.log("get location error", error);
    }
  };

  return (
    <PressableButton
      pressedFunction={getLocation}
      pressedStyle={pressedStyle}
      defaultStyle={defaultStyle}
    >
      {children}
    </PressableButton>
  );
}
