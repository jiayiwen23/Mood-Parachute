import { Image, StyleSheet } from "react-native";
import TabNabigator from "./navigations/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import CardsScreen from "./screens/CardsScreen";
import EntryItem from "./components/EntryItem";

export default function App() {
  const sampleEntry = {
    time: '12:22:11 ',
    text: 'This is a sample entry text.',
    image: <Image source={require('./assets/favicon.png')} style={{ width: 50, height: 50 }} />,
  };

  return (
    <NavigationContainer>
      <EntryItem entry={sampleEntry}/>
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
