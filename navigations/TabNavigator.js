import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CardsScreen from "../screens/CardsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AllJournalScreen from "../screens/AllJournalScreen";
import PressableButton from "../components/PressableButton";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../colors";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="All Journal"
        component={AllJournalScreen}
        options={{
          headerRight: () => (
            <PressableButton
              pressedFunction={() => navigation.navigate("Add Journal")}
              defaultStyle={{ paddingRight: 10 }}
              pressedStyle={{ opacity: 0.8 }}
            >
              <AntDesign name="plus" size={20} color={colors.black} />
            </PressableButton>
          ),
        }}
      />
      <Tab.Screen name="Cards" component={CardsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
