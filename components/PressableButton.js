import { Pressable } from 'react-native'
import React from 'react'

const PressableButton = ({ children, defaultStyle, pressedStyle, pressedFunction }) => {

  return (
    <Pressable onPress={pressedFunction} 
        style={({pressed})=> {
            return [defaultStyle, pressed && pressedStyle];
        }}
    >
        {children}
    </Pressable>
  )
}

export default PressableButton