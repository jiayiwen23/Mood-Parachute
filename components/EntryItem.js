import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import { colors } from "../colors";

const EntryItem = ({ entry, navigation }) => {
  const entryPressHandler = () => {
    navigation.navigate("Add Journal", { entry: entry });
  };

  return (
    //an entry has 6 props: id, time, text, image, location, mood. We only implemented time, text and mood for iteration 1
    <PressableButton
      pressedStyle={styles.pressed}
      defaultStyle={styles.container}
      pressedFunction={entryPressHandler}
    >
      <View style={styles.labelContainer}>
        <Text style={styles.dateText}>{entry.date}</Text>
        <Image source={entry.mood} style={{ width: 30, height: 30 }} />
      </View>

      <View style={styles.journalContainer}>
        <Text style={styles.text}>{entry.journal}</Text>
        {/* {entry.image && <View style={styles.image}>{entry.image}</View>} */}
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
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  pressed: {
    opacity: 0.8,
  },
  dateText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 11,
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
  },
  image: {
    margin: 5,
  },
});

export default EntryItem;
