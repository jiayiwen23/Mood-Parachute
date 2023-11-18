import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import PressableButton from "./PressableButton";
import { colors } from "../colors";

export default function YearPicker({ selectedYear, onYearChange, hideModal }) {
  const [year, setYear] = useState(selectedYear);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, index) => 1900 + index
  );

  const confirmHandler = () => {
    onYearChange(year);
  };

  const cancelHandler = () => {
    hideModal(false);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={year}
        onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
      >
        {years.map((year) => (
          <Picker.Item label={year.toString()} value={year} key={year} />
        ))}
      </Picker>
      <View style={styles.buttonContainer}>
        <PressableButton
          pressedFunction={cancelHandler}
          defaultStyle={styles.button}
        >
          <Text style={styles.text}>Cancel</Text>
        </PressableButton>
        <PressableButton
          pressedFunction={confirmHandler}
          defaultStyle={styles.button}
        >
          <Text style={styles.text}>Confirm</Text>
        </PressableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 20,
  },
  button: {
    backgroundColor: colors.border,
    borderRadius: 10,
    padding: 8,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
