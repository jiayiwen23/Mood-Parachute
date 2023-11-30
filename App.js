import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./firebase/firebaseSetup";
import Login from "./screens/authentication/Login";
import Signup from "./screens/authentication/Signup";
import { onAuthStateChanged } from "firebase/auth";
import AppNavigator from "./navigations/AppNavigator";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const AuthStack = (
    <>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
    </>
  );

  const AppStack = (
    <>
      <Stack.Screen
        name="App Navigator"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
      >
        {isLoggedIn ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}