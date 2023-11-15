import { Pressable, StyleSheet } from 'react-native'
import React from 'react'

const PressableButton = ({ children, defaultStyle, pressedStyle, pressedFunction }) => {

  return (
    <Pressable onPress={pressedFunction} 
        style={({pressed})=> {
            return [styles.styleByDefault, defaultStyle, pressed && pressedStyle];
        }}
    >
        {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
    styleByDefault: {
      flexDirection: "row",
      marginBottom: 20,
      borderRadius: 5,
      alignItems: "center",
    },
  });

export default PressableButton