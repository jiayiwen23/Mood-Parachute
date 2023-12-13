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
        <View style={styles.dateLocation}>
          <Text style={styles.labelText}>{entry.date}</Text>
          {entry.location.length > 0 && (
            <Text style={styles.labelText}>@{entry.location[0]}</Text>
          )}
        </View>
        <Image source={entry.mood} style={{ width: 30, height: 30 }} />
      </View>
      <View style={styles.journalContainer}>
        {entry.image && (
          <Image source={{ uri: entry.image }} style={styles.image} />
        )}
        <Text style={styles.text}>{entry.journal}</Text>
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
    padding: 5,
    margin: 10,
  },
  dateLocation: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  pressed: {
    opacity: 0.8,
  },
  labelText: {
    color: colors.title,
    fontWeight: "bold",
    fontSize: 11,
    margin: 5,
  },
  journalContainer: {
    flexDirection: "row",
    paddingLeft: 5,
  },
  text: {
    fontSize: 15,
    margin: 5,
    paddingTop: 5,
  },
  image: {
    margin: 5,
    width: 100,
    height: 100,
  },
});

export default EntryItem;
