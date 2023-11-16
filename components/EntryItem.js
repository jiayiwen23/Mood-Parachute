import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import { colors } from "../colors";

const EntryItem = ({ entry }) => {
  const entryPressHandler = () => {
    //navigation.navigate("Edit Journal", { entry: entry })
  };

  return (
    //an entry has 4 props: id, time, text, image
    <PressableButton
      pressedStyle={styles.pressed}
      defaultStyle={styles.container}
      pressedFunction={entryPressHandler}
    >
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{entry.time}</Text>
      </View>

      <View style={styles.journalContainer}>
        <Text style={styles.text}>{entry.text}</Text>
        {entry.image && <View style={styles.image}>{entry.image}</View>}
      </View>
    </PressableButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  labelContainer: {
    marginLeft: 15,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  journalContainer: {
    flexDirection: "row",
    marginLeft: 10,
    flexDirection: "column",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 16,
    margin: 5,
    marginBottom: 10,
  },
  image: {
    margin: 5,
  },
});

export default EntryItem;
