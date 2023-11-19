import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import AddEntryScreen from "../screens/AddEntryScreen";
import AidCard from "../screens/cardDetail/AidCard";
import HappinessCard from "../screens/cardDetail/HappinessCard";
import LuckyCard from "../screens/cardDetail/LuckyCard";
import LandscapeCard from "../screens/cardDetail/LandscapeCard";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="All Journals"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Add Journal" component={AddEntryScreen} />

        <Stack.Screen 
          name="Aid Card" 
          component={AidCard}
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen 
          name="Happiness Card" 
          component={HappinessCard}
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen 
          name="Lucky Card" 
          component={LuckyCard}
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen 
          name="Landscape Card" 
          component={LandscapeCard}
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
