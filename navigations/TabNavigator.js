import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CardsScreen from "../screens/CardsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AllJournalScreen from "../screens/AllJournalScreen";

const Tab = createBottomTabNavigator();

export default function TabNabigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AllJournal" component={AllJournalScreen} />
      <Tab.Screen name="Cards" component={CardsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
