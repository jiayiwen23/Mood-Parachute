import { View, Text } from 'react-native'
import React, { useState } from 'react'

const DateTimePicker = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  return (
    <View>
      <Text>DateTimePicker</Text>
    </View>
  )
}

export default DateTimePicker