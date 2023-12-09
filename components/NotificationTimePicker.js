import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../colors';
import PressableButton from './PressableButton';
import DateTimePicker from 'react-native-modal-datetime-picker';

const NotificationTimePicker = ({ show, onDateChange, onTimeChange }) => {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(false);
    setShowTime(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDate(true);
  };

  const showTimepicker = () => {
    setShowTime(true);
  };

  return (
    <View>
        <View style={styles.buttonRow}>
            <PressableButton
                pressedFunction={showDatepicker}
                pressedStyle={styles.pressedStyle}
                defaultStyle={styles.defaultStyle}
            >
                <Text style={styles.buttonText}>Select Date</Text>
            </PressableButton>

            <PressableButton
                pressedFunction={showTimepicker}
                pressedStyle={styles.pressedStyle}
                defaultStyle={styles.defaultStyle}
            >
                <Text style={styles.buttonText}>Select Time</Text>
            </PressableButton>
        </View>

        {show && (
        <>
        <DateTimePicker
          testID="datePicker"
          isVisible={showDate}
          mode="date"
          minimumDate={new Date()}
          onConfirm={(selectedDate) => {
            onDateChange(selectedDate);
          }}
          onCancel={() => setShowDate(false)}
        />

        <DateTimePicker
          testID="timePicker"
          isVisible={showTime}
          mode="time"
          is24Hour={true}
          onConfirm={(selectedDate) => {
            onTimeChange(selectedDate);
          }}
          onCancel={() => setShowTime(false)}
        />
      </>
      )}

      <Text style={styles.description}>
        {date.toLocaleString('en-CA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
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
    description: {
        marginTop: 20,
        color: colors.border,
        fontSize: 13,
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