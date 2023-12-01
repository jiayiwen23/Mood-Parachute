import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import React from "react";
import PressableButton from "../components/PressableButton";
import { colors } from "../colors";
import { AntDesign } from "@expo/vector-icons";
import ImageManager from "../components/ImageManager";

const screenWidth = Dimensions.get("window").width;

export default function AddCardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", alignSelf: "flex-start" }}>
        Card Set Name
      </Text>
      <TextInput style={styles.input} placeholder="Enter Card Set Name" />
      <View
        style={{
          backgroundColor: colors.white,
          width: screenWidth * 60 * 0.01,
          height: 200,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          borderColor: colors.border,
        }}
      >
        <ImageManager />
      </View>
      <View style={styles.image}>
        <Text>Text</Text>
        <TextInput placeholder="Enter Card Name" />
      </View>
      <View style={styles.buttonContainer}>
        <PressableButton pressedFunction={() => navigation.goBack()}>
          <AntDesign name="back" size={40} color={colors.cardBack} />
        </PressableButton>
        <PressableButton pressedFunction={() => navigation.goBack()}>
          <AntDesign name="back" size={40} color={colors.cardBack} />
        </PressableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth * 90 * 0.01,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "flex-start",
    padding: 20,
  },
  cardName: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    height: 40,
    width: screenWidth * 90 * 0.01,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  image: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 1,
  },
});
