import React from "react";
import { Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import AddEntryScreen from "../screens/AddEntryScreen";
import AidCard from "../screens/cardDetail/AidCard";
import HappinessCard from "../screens/cardDetail/HappinessCard";
import LuckyCard from "../screens/cardDetail/LuckyCard";
import SceneryCard from "../screens/cardDetail/SceneryCard";
import PressableButton from "../components/PressableButton";
import { AntDesign } from "@expo/vector-icons";
import { deleteToDB, deleteCardToDB } from "../firebase/firebaseHelper";
import AddCardScreen from "../screens/AddCardScreen";
import UserCardsScreen from "../screens/UserCardsScreen";
import NotificationTimeScreen from "../screens/NotificationTimeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  // handle the trash icon deletion functionality in Edit Screen
  const handleEntryDelete = ({ route, navigation }) => {
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

  const handleCardDelete = ({ route, navigation }) => {
    Alert.alert("Important", "Are you sure you want to delete it?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          deleteCardToDB(route.params.card.id);
          navigation.goBack();
        },
      },
    ]);
  };
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Tab"
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
                        handleEntryDelete({ route, navigation })
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
          name="Add Card"
          component={AddCardScreen}
          options={({ route, navigation }) => ({
            title:
              route.params && route.params.card
                ? "Edit Card"
                : "Add Your Own Card",
            headerRight:
              route.params && route.params.card
                ? () => (
                    <PressableButton
                      pressedFunction={() =>
                        handleCardDelete({ route, navigation })
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
          name="User Cards"
          component={UserCardsScreen}
          options={{
            headerTitle: "My Cards",
          }}
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
        <Stack.Screen
          name="Notification"
          component={NotificationTimeScreen}
          options={{
            headerShown: false,
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </>
  );
}
