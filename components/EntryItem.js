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
      <View style={styles.timeContainer}>
        <Text style={styles.label}>{entry.time}</Text>
      </View>
      
      <View style={styles.journalContainer}>
          <Text style={styles.text}>{entry.text}</Text>
          <View style={styles.image}>{entry.image}</View>
      </View>

    </PressableButton>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: colors.background,
      borderRadius: 10,
      padding: 10,
      margin: 10,
      marginTop: 200,
    },
    timeContainer: {
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
      alignSelf:"flex-start",
    },
    text: {
      fontSize: 16,
      margin: 5,
    },
    image: {
      margin: 5,
    },
  });

export default EntryItem