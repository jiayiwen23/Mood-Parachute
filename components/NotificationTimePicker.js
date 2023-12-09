import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../colors';
import PressableButton from './PressableButton';
import DateTimePicker from 'react-native-modal-datetime-picker';

const NotificationTimePicker = ({ show, onTimeChange }) => {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    if (showTime) {
      setShowTime(false);
      setDate(currentDate);
      onTimeChange && onTimeChange(currentDate);
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
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
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
        fontSize: 30,
        textAlign: "center",
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
        fontSize: 20,
        textAlign: "center",
        color: colors.border,
    },
  });

export default NotificationTimePicker