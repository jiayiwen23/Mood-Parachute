import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../colors";
import PressableButton from "./PressableButton";

const UserCardItem = ({ card, navigation }) => {
  const cardPressedHandler = () => {
    console.log("pressed");
    navigation.navigate("Add Card", { card: card });
  };
  return (
    <View style={styles.container}>
      <PressableButton pressedFunction={cardPressedHandler}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: card.image }} style={styles.image} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>{card.cardName}</Text>
          </View>
        </View>
      </PressableButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  card: {
    width: 350,
    height: 600,
    backgroundColor: colors.cardBackgroud,
    borderRadius: 8,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
  },
  imageContainer: {
    flex: 0.85,
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
});

export default UserCardItem;
