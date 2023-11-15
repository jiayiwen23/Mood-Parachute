import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../colors";
import CardBack from "../components/CardBack";

export default function CardsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FLIP A CARD</Text>
      <CardBack></CardBack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  title: {
    fontSize: 35,
    alignSelf: "center",
    color: colors.title,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
  },
});
