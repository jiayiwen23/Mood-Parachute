import { Image, Pressable, View, Text, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import EntriesList from "../components/EntriesList";
import { AntDesign } from "@expo/vector-icons";
import PressableButton from "../components/PressableButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import YearPicker from "../components/YearPicker";
import { Feather } from "@expo/vector-icons";
import MonthOptions from "../components/MonthOptions";

export default function AllJournalScreen({ navigation }) {
  const [isYearPickerVisible, setYearPickerVisibility] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setYearPickerVisibility(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <PressableButton
          pressedFunction={() => setYearPickerVisibility(true)}
          defaultStyle={{ flexDirection: "row", alignItems: "center" }}
          pressedStyle={{ opacity: 0.7 }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: "bold", color: colors.border }}
          >
            {selectedYear}
          </Text>
          <Feather
            name="chevron-down"
            size={24}
            color={colors.border}
            style={{ marginLeft: 5 }}
          />
        </PressableButton>
      ),
      headerRight: () => (
        <PressableButton
          pressedFunction={() => navigation.navigate("Add Journal")}
          defaultStyle={{ paddingRight: 10 }}
          pressedStyle={{ opacity: 0.8 }}
        >
          <MaterialCommunityIcons
            name="book-plus-outline"
            size={28}
            color={colors.border}
          />
        </PressableButton>
      ),
    });
  }, [navigation, selectedYear]);

  return (
    <View>
      <MonthOptions
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
      <Modal visible={isYearPickerVisible} animationType="slide">
        <YearPicker
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
          hideModal={setYearPickerVisibility}
        />
      </Modal>
      <EntriesList
        navigation={navigation}
        year={selectedYear}
        month={selectedMonth}
      />
    </View>
  );
}
