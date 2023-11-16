import { Image, StyleSheet } from "react-native";
import TabNabigator from "./navigations/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import CardsScreen from "./screens/CardsScreen";
import EntryItem from "./components/EntryItem";
import EntriesList from "./components/EntriesList";

export default function App() {
  
  const sampleEntries = [
    {
    id: 1,
    time: '12:22:11 ',
    text: 'This is a sample entry text.',
    image: <Image source={require('./assets/favicon.png')} style={{ width: 50, height: 50 }} />,
  }, 
  {
    id: 2,
    time: '18:21:11 ',
    text: 'This is another sample entry text.',
  },];

  return (
    <NavigationContainer>
      <EntriesList entries={sampleEntries}/>
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
