import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PressableButton from './PressableButton';
import { colors } from '../colors';

const EntryItem = ({ entry, navigation }) => {
  return (
    //an entry has three props: time, text, image 
    <PressableButton
      pressedStyle={styles.pressed}
      defaultStyle={styles.container}
      pressedFunction={() =>
        navigation.navigate("Edit Journal", { entry: entry })
      }
    >
      <Text style={styles.label}>{entry.time}</Text>

      <View style={styles.journalContainer}>
          <Text style={{ fontWeight: "bold" }}>{entry.text}</Text>
          <View style={styles.image}>{entry.image}</View>
      </View>

    </PressableButton>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.background,
      borderRadius: 10,
      padding: 10,
      margin: 10,
      marginTop: 200,
    },
    pressed: {
      opacity: 0.8,
    },
    label: {
      color: colors.white,
      fontWeight: "bold",
    },
    journalContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
    },
    image: {

    },
  });

export default EntryItem