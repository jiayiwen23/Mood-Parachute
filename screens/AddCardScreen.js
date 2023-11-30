import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PressableButton from "../components/PressableButton";
import { colors } from "../colors";
import { AntDesign } from "@expo/vector-icons";

export default function AddCardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>AddCardScreen</Text>
      <PressableButton pressedFunction={() => navigation.goBack()}>
        <AntDesign name="back" size={40} color={colors.cardBack} />
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
