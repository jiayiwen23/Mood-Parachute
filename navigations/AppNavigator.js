import React from "react";
import { Alert } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import AddEntryScreen from "../screens/AddEntryScreen";
import AidCard from "../screens/cardDetail/AidCard";
import HappinessCard from "../screens/cardDetail/HappinessCard";
import LuckyCard from "../screens/cardDetail/LuckyCard";
import SceneryCard from "../screens/cardDetail/SceneryCard";
import PressableButton from "../components/PressableButton";
import { AntDesign } from "@expo/vector-icons";
import { deleteToDB } from "../firebase/firebaseHelper";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  // handle the trash icon deletion functionality in Edit Screen
  const handleDelete = ({ route, navigation }) => {
    Alert.alert("Important", "Are you sure you want to delete it?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          deleteToDB(route.params.entry.id);
          navigation.goBack();
        },
      },
    ]);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="All Journals"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Add Journal"
          component={AddEntryScreen}
          options={({ route, navigation }) => ({
            title: route.params && route.params.entry ? "Edit" : "Add Journal",
            headerRight:
              route.params && route.params.entry
                ? () => (
                    <PressableButton
                      pressedFunction={() =>
                        handleDelete({ route, navigation })
                      }
                      defaultStyle={{ paddingRight: 10 }}
                      pressedStyle={{ opacity: 0.8 }}
                    >
                      <AntDesign name="delete" size={20} color="black" />
                    </PressableButton>
                  )
                : null,
          })}
        />
        <Stack.Screen
          name="Aid Card"
          component={AidCard}
          options={{
            headerShown: false,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Happiness Card"
          component={HappinessCard}
          options={{
            headerShown: false,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Lucky Card"
          component={LuckyCard}
          options={{
            headerShown: false,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Scenery Card"
          component={SceneryCard}
          options={{
            headerShown: false,
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
