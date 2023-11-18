import { View, Text } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import PressableButton from "./PressableButton";

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
    <View>
      <Picker
        selectedValue={year}
        onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
      >
        {years.map((year) => (
          <Picker.Item label={year.toString()} value={year} key={year} />
        ))}
      </Picker>
      <PressableButton pressedFunction={confirmHandler}>
        <Text>Confirm</Text>
      </PressableButton>
      <PressableButton pressedFunction={cancelHandler}>
        <Text>Cancel</Text>
      </PressableButton>
    </View>
  );
}
