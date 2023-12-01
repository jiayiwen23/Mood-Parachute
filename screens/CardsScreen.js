import { View, Text, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";
import { colors } from "../colors";
import CardBack from "../components/CardBack";
import { AntDesign } from "@expo/vector-icons";
import PressableButton from "../components/PressableButton";
import UserCardsList from "../components/UserCardsList";

export default function CardsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: 70,
          paddingRight: 30,
          alignSelf: "flex-end",
        }}
      >
        <PressableButton
          defaultStyle={styles.buttonDefault}
          pressedFunction={() => navigation.navigate("User Cards")}
        >
          <Text style={{ color: colors.white, fontWeight: "bold" }}>
            My cards
          </Text>
        </PressableButton>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>FLIP A CARD</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.row}>
          <CardBack navigation={navigation} />
          <CardBack navigation={navigation} />
        </View>

        <View style={styles.row}>
          <CardBack navigation={navigation} />
          <CardBack navigation={navigation} />
        </View>
      </View>
      <View style={styles.button}>
        <PressableButton
          pressedFunction={() => navigation.navigate("Add Card")}
        >
          <AntDesign name="pluscircle" size={40} color={colors.cardBack} />
        </PressableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignSelf: "center",
    marginTop: 100,
  },
  buttonDefault: {
    backgroundColor: colors.border,
    borderRadius: 5,
    padding: 5,
    width: 90,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  card: {
    flex: 4,
  },
  title: {
    fontSize: 40,
    alignSelf: "center",
    color: colors.title,
    fontWeight: "bold",
    marginBottom: 10,
    letterSpacing: 2,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
});
