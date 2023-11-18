import { View, Text } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

export default function YearPicker({ selectedYear, onYearChange }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, index) => 1900 + index
  );
  return (
    <View>
      <Picker
        selectedValue={selectedYear}
        onValueChange={(itemValue, itemIndex) => onYearChange(itemValue)}
      >
        {years.map((year) => (
          <Picker.Item label={year.toString()} value={year} key={year} />
        ))}
      </Picker>
    </View>
  );
}
