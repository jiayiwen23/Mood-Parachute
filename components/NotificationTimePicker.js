import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../colors';
import PressableButton from './PressableButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { utcToZonedTime } from 'date-fns-tz';

const NotificationTimePicker = ({ show, onTimeChange }) => {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    if (showTime) {
      setShowTime(false);
      const localTime = utcToZonedTime(currentDate, 'America/Vancouver');
      setDate(localTime);
      onTimeChange && onTimeChange(localTime);
    }
  };

  const showTimepicker = () => {
    setShowTime(true);
  };

  return (
    <View>
        <View style={styles.buttonRow}>
            <PressableButton
                pressedFunction={showTimepicker}
                pressedStyle={styles.pressedStyle}
                defaultStyle={styles.defaultStyle}
            >
                <Text style={styles.buttonText}>Select Time</Text>
            </PressableButton>
        </View>

        {show &&
          <DateTimePicker
            testID="timePicker"
            isVisible={showTime}
            mode="time"
            is24Hour={true}
            onConfirm={(selectedDate) => {
              onChange(selectedDate);
            }}
            onCancel={() => setShowTime(false)}
          />
        }

      <Text style={styles.confirmation}>
        {date.toLocaleString('en-CA', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'America/Vancouver',
        })}
      </Text>
  </View>
  )
}

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    confirmation: {
        margin: 20,
        color: colors.border,
        fontSize: 35,
        textAlign: "center",
        fontWeight: "bold",
    },
    defaultStyle: {
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: colors.button,
        padding: 10,
        alignSelf: "center",
    },
    pressedStyle: {
        backgroundColor: colors.buttonPressed,
    },
    buttonText: {
        fontSize: 22,
        textAlign: "center",
        color: colors.border,
    },
  });

export default NotificationTimePicker