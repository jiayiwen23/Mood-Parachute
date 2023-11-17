import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import AddEntryScreen from "../screens/AddEntryScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="All Journals"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add Journal" component={AddEntryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
