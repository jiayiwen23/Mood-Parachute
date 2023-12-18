import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import { colors } from "../colors";
import PressableButton from "../components/PressableButton";
import NotificationTimePicker from "../components/NotificationTimePicker";
import { utcToZonedTime } from "date-fns-tz";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationTimeScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(true);

  async function verifyPermission() {
    const permission = await Notifications.getPermissionsAsync();
    if (permission.granted === true) {
      return true;
    }
    const result = await Notifications.requestPermissionsAsync();
    return result.granted;
  }

  async function scheduleNotificationHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("Need your permission to set notification");
      return;
    }
    try {
      const vancouverTime = utcToZonedTime(date, "America/Vancouver");
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Mood Parachute",
          body: "It's time to record your mood.",
        },
        trigger: {
          hour: vancouverTime.getHours(),
          minute: vancouverTime.getMinutes(),
          repeats: true,
        },
      });

      const formattedTime = vancouverTime.toLocaleString("en-CA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Vancouver",
      });

      Alert.alert(`Notification is set for ${formattedTime}.`, "", [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (err) {
      console.log("Notification error:", err);
      Alert.alert("Failed to schedule notification. Please try again.");
    }
  }

  const handleTimeChange = (selectedTime) => {
    setDate(selectedTime);
  };

  const cancelNotificationHandler = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      Alert.alert("Notification canceled.", "", [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (err) {
      console.log("Notification cancellation error:", err);
      Alert.alert("Failed to cancel notification. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.choose}>
        Choose the time for{"\n"}🔔 daily notification{" "}
      </Text>
      {show && (
        <NotificationTimePicker show={show} onTimeChange={handleTimeChange} />
      )}

      <View style={styles.buttonContainer}>
        <PressableButton
          pressedFunction={() => navigation.goBack()}
          pressedStyle={styles.pressedStyle}
          defaultStyle={styles.defaultStyle}
        >
          <Text style={styles.buttonText}>Go back</Text>
        </PressableButton>

        <PressableButton
          pressedFunction={scheduleNotificationHandler}
          pressedStyle={styles.pressedStyle}
          defaultStyle={styles.defaultStyle}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </PressableButton>

        <PressableButton
          pressedFunction={cancelNotificationHandler}
          pressedStyle={styles.pressedStyle}
          defaultStyle={styles.defaultStyle}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </PressableButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 20,
  },
  description: {
    marginTop: 20,
    color: colors.border,
    fontSize: 13,
  },
  choose: {
    alignSelf: "center",
    fontSize: 30,
    paddingBottom: 15,
    color: colors.border,
    lineHeight: 50,
  },
  defaultStyle: {
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: colors.border,
    padding: 10,
    alignSelf: "center",
  },
  pressedStyle: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    color: colors.white,
  },
});

export default NotificationTimeScreen;
