import { Image, Pressable, View, Text, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import Weekdays from "../components/Weekdays";
import EntriesList from "../components/EntriesList";
import { AntDesign } from "@expo/vector-icons";
import PressableButton from "../components/PressableButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import YearPicker from "../components/YearPicker";

export default function AllJournalScreen({ navigation }) {
  const [isYearPickerVisible, setYearPickerVisibility] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setYearPickerVisibility(false);
  };

  return (
    <View>
      <Weekdays />
      <PressableButton pressedFunction={() => setYearPickerVisibility(true)}>
        <Text>{selectedYear}</Text>
      </PressableButton>
      <Modal visible={isYearPickerVisible} animationType="slide">
        <YearPicker
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
          hideModal={setYearPickerVisibility}
        />
      </Modal>
      <EntriesList navigation={navigation} />
    </View>
  );
}
