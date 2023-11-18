import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import PressableButton from "./PressableButton";
import { colors } from "../colors";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthOptions({ selectedMonth, onMonthChange }) {
  const [month, setMonth] = useState(selectedMonth);

  const getMonthNumber = (monthName) => {
    return months.indexOf(monthName) + 1;
  };

  const handleMonthChange = (monthName) => {
    const monthNumber = getMonthNumber(monthName);
    setMonth(monthNumber);
    onMonthChange(monthNumber);
  };

  const renderMonth = (monthName, index) => {
    const monthNumber = getMonthNumber(monthName);
    const isSelected = monthNumber === month;

    return (
      <View key={monthName} style={styles.month}>
        <PressableButton
          pressedFunction={() => handleMonthChange(monthName)}
          defaultStyle={styles.monthButton}
        >
          <Text style={styles.monthText}>{monthName} </Text>
          {/* {isSelected ? <View style={styles.selectedDot} /> : null} */}
        </PressableButton>
        {isSelected ? <View style={styles.selectedDot} /> : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.monthButtonContainer}>
        {months.slice(0, 6).map(renderMonth)}
      </View>
      <View style={styles.monthButtonContainer}>
        {months.slice(6, 12).map(renderMonth)}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  selectedDot: {
    backgroundColor: "red",
    borderRadius: 3,
    width: 6,
    height: 6,
    position: "absolute",
    bottom: -8,
  },
  monthText: {
    fontSize: 15,
    color: colors.white,
    alignSelf: "center",
  },
  monthButton: {
    backgroundColor: colors.border,
    borderRadius: 10,
    padding: 8,
    margin: 5,
    width: 50,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
  },
  monthButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    //backgroundColor: "tomato",
    marginBottom: 10,
  },
  month: {
    position: "relative",
    alignItems: "center",
  },
});
