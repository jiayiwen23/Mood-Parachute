import { View, Text, Image } from "react-native";
import React from "react";

export default function ProfileScreen() {
  return (
    <View>
      <Text>User Name{'\n'}Email Address</Text>
      <Image source={require("../assets/favicon.png")} style={{ width: 30, height: 30 }} />

    </View>
  );
}
