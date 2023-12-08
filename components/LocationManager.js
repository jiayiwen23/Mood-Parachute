import { StyleSheet } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";
import { colors } from "../colors";
import PressableButton from "./PressableButton";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function LocationManager({
  children,
  passLocation,
  passAddress,
  passLoading,
  defaultStyle,
  pressedStyle,
}) {
  const [status, requestPermission] = Location.useForegroundPermissions();

  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    const response = await requestPermission();
    return response.granted;
  };

  async function getAddressFromLocation(location) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`
      );
      const data = await response.json();
      if (!data.results) {
        return;
      }
      console.log(data.results[0]);
      const formattedAddress = data.results[0].formatted_address;
      passAddress(formattedAddress);
    } catch (error) {
      console.log("get address error", error);
    }
  }
  const getLocation = async () => {
    try {
      passLoading(true);
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
      passLocation(newLocation);
      getAddressFromLocation(newLocation);
      passLoading(false);
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
