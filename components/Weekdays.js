import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

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
}
