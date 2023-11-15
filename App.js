import { StyleSheet } from "react-native";
import TabNabigator from "./navigations/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import CardsScreen from "./screens/CardsScreen";

export default function App() {
  return (
    <NavigationContainer>
      <CardsScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
