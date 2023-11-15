import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import PressableButton from "./PressableButton";

const daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

export default function Weekdays() {
  const [selectedDate, setSelectedDate] = useState(undefined);
  const startDate = new Date();
  // The start date is always Sunday
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // Create an array that includes a week of dates starting from start date
  const dates = new Array(7).fill(null).map((_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  const today = new Date();

  // To render each date in the week
  const renderDay = (date, index) => {
    // Get the date part
    const dateString = date.toISOString().split("T")[0];
    const isToday = today.toISOString().split("T")[0] == dateString;
    const isSelected = dateString == selectedDate;

    return (
      <View style={styles.dayContainer}>
        <PressableButton pressedFunction={() => setSelectedDate(dateString)}>
          <Text>{daysOfWeek[date.getDay()]}</Text>
          <Text>{isToday ? "Today" : date.getDate()}</Text>
          {isSelected ? <View style={styles.selectedDot} /> : null}
        </PressableButton>
      </View>
    );
  };

  return <View style={styles.container}>{dates.map(renderDay)}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  dayContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 60,
  },
  selectedDot: {
    backgroundColor: "red",
    borderRadius: 100,
  },
});
