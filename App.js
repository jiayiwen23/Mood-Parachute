import AppNavigator from "./navigations/AppNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./firebase/firebaseSetup";
import Login from "./screens/authentication/Login";
import Signup from "./screens/authentication/Signup";
import { onAuthStateChanged } from "firebase/auth";

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

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
      >
        {isLoggedIn ? AppNavigator : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}