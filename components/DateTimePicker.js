import { View, Text, StyleSheet, Button, Platform } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../colors';

const DateTimePicker = ({ changeDatetimeHandler }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    changeDatetimeHandler(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setShow(true);
    showMode("date");
  };

  const showTimepicker = () => {
    setShow(true);
    showMode("time");
  };

  return (
    <View style={styles.container}>

    <View style={styles.buttonContainer}>
      <Button onPress={showDatepicker} title="Select date" />
      <Text>{"           "}</Text>
      <Button onPress={showTimepicker} title="Select time" />
    </View>

    {show && (
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={true}
        onChange={onChange}
      />
    )}

    <Text style={styles.description}>
      {date.toLocaleString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}
    </Text>

  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 30,
      marginBottom: 30,
    },
    description: {
      marginTop: 20,
      color: colors.border,
      fontSize: 13,
    },
  });

export default DateTimePicker