import { Pressable } from "react-native";
import React from "react";

export default function PressableButton({
  children,
  pressedFunction,
  pressedStyle,
  defaultStyle,
}) {
  return (
    <Pressable
      onPress={pressedFunction}
      style={(pressed) => [defaultStyle, pressed && pressedStyle]}
    >
      {children}
    </Pressable>
  );
}
