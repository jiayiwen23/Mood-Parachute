import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";

import CardsScreen from "../screens/CardsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AllJournalScreen from "../screens/AllJournalScreen";
import { colors } from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="All Journal"
        component={AllJournalScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <View style={styles.tabBar}>
              <MaterialCommunityIcons
                name="notebook-outline"
                size={30}
                color={colors.border}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: () => (
            <View style={styles.tabBar}>
              <MaterialCommunityIcons
                name="cards-playing-diamond-multiple-outline"
                size={30}
                color={colors.border}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <View style={styles.tabBar}>
              <MaterialCommunityIcons
                name="account-settings-outline"
                size={30}
                color={colors.border}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.backgroundDarkPurple,
  },
  tabBar: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarText: {
    color: colors.icon,
    fontSize: 12,
  },
});
