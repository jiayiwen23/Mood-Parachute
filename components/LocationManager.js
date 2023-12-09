import { StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";
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
      const street =
        data.results[0].address_components[1].short_name +
        ", " +
        data.results[0].address_components[2].short_name;
      return street;
    } catch (error) {
      console.log("get address error", error);
    }
  }
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
      const locationObject = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 5000, // 5 seconds
      });

      const newLocation = {
        latitude: locationObject.coords.latitude,
        longitude: locationObject.coords.longitude,
      };

      const street = await getAddressFromLocation(newLocation);
      setLocation({ street: street, ...newLocation });
      passLocation([street, newLocation]);
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
