import { View, Text, Platform, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import * as Notifications from "expo-notifications";
import { colors } from '../colors';
import PressableButton from '../components/PressableButton';
import NotificationTimePicker from '../components/NotificationTimePicker';

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

    async function scheduleNotificationHandler () {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
          Alert.alert("Need your permission to setup notification");
          return;
        }
        try {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Mood Parachute",
                body: "It's time to record your mood",
              },
              trigger: {
                hour: date.getHours(),
                minute: date.getMinutes(),
                repeats: true,
              },
            });
        
            Alert.alert(
                "Notification is set for " +
                  date.getHours() +
                  ":" +
                  date.getMinutes() +
                  ".",
                "",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      navigation.goBack();
                    },
                  },
                ]
              );
        } catch (err) {
            console.log("Notification error:", err);
            Alert.alert("Failed to schedule notification. Please try again.");
          }
      };

      const onChange = (selectedDate) => {
        const currentDate = selectedDate;
        if (Platform.OS === "android") {
          setShow(false);
        }
        setDate(currentDate);
      };

      const handlePress=()=>{

      }

  return (
     <View style={styles.container}>
        <Text style={styles.choose}>Choose the time for notification </Text>
        {show && <NotificationTimePicker show={show} onChange={onChange} />}

      {Platform.OS === "android" && (
        <View>
          <PressableButton
            pressedFunction={handlePress}
          >
          </PressableButton>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <PressableButton
            pressedFunction={scheduleNotificationHandler}
        >
            <Text>Confirm</Text>
        </PressableButton>
      </View>

    </View>
  )
}

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
        alignSelf:"center",
        fontSize: 25,
        paddingBottom: 15,
        color: colors.border,
    },
  });

export default NotificationTimeScreen