import { Image, Pressable, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Weekdays from "../components/Weekdays";
import EntriesList from "../components/EntriesList";
import { AntDesign } from "@expo/vector-icons";
import PressableButton from "../components/PressableButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AllJournalScreen({ navigation }) {
  const [isYearPickerVisible, setYearPickerVisibility] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const showYearPicker = () => {
    setYearPickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
    hideDatePicker();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CustomHeaderTitle date={selectedDate} />,
      headerRight: () => (
        <PressableButton
          pressedFunction={() => navigation.navigate("Add Journal")}
          defaultStyle={{ paddingRight: 10 }}
          pressedStyle={{ opacity: 0.8 }}
        >
          <MaterialCommunityIcons
            name="book-plus-outline"
            size={30}
            color="#377f7c"
          />
        </PressableButton>
      ),
    });
  }, [navigation, selectedDate]);
  return (
    <View>
      <Weekdays date={selectedDate} />
      <EntriesList navigation={navigation} date={selectedDate} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={new Date(selectedDate)}
      />
    </View>
  );
}
