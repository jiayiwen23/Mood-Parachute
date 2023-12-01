import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../colors";

const Card = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  card: {
    width: 350,
    height: 600,
    backgroundColor: colors.cardBackgroud,
    borderRadius: 8,
    padding: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
    marginBottom: 60,
  },
});

export default Card;
