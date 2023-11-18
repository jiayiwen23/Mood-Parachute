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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  function CustomHeaderTitle() {
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
      const updateDate = () => {
        const today = new Date();
        const month = today.toLocaleString("default", { month: "long" });
        const year = today.getFullYear();
        setCurrentDate(`${year} ${month}`);
      };

      updateDate();

      const intervalId = setInterval(updateDate, 1000 * 60 * 60 * 24);
      return () => clearInterval(intervalId);
    }, []);
    return (
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: colors.border }}
        >
          {currentDate}
        </Text>
        <PressableButton pressedFunction={showDatePicker}>
          <AntDesign
            name="down"
            size={18}
            color={colors.border}
            style={{ marginLeft: 5, marginTop: 2 }}
          />
        </PressableButton>
      </View>
    );
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CustomHeaderTitle />,
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
  }, [navigation]);
  return (
    <View>
      <Weekdays date={selectedDate} />
      <EntriesList navigation={navigation} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={selectedDate}
      />
    </View>
  );
}
