import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import PressableButton from "../../components/PressableButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseSetup";
import { colors } from "../../colors";
import Header from "../../components/Header";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupHandler = () => {
    navigation.replace("Signup");
  };
  const loginHandler = async () => {
    if (!email || !password) {
      Alert.alert("Fields should not be empty");
      return;
    }
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred);
    } catch (err) {
      console.log(err);
      if (err.code === "auth/invalid-login-credentials") {
        Alert.alert("invalid credentials");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <TextInput
        placeholder="USERNAME"
        style={styles.input}
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="PASSWORD"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />

      <PressableButton 
        pressedFunction={loginHandler} 
        pressedStyle={styles.pressedStyle}
        defaultStyle={styles.defaultStyle} >
        <Text>Login</Text>
      </PressableButton>

      <PressableButton 
        pressedFunction={signupHandler}
        pressedStyle={styles.pressedStyle}
        defaultStyle={styles.defaultStyle} >
        <Text>Create An Account</Text>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "stretch",
    justifyContent: "center",
  },
  input: {
    borderColor: colors.border,
    borderBottomWidth: 2,
    width: "80%",
    margin: 5,
    padding: 5,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
  },
  defaultStyle:{
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: colors.button,
  },
  pressedStyle:{
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: colors.buttonPressed,
  },
});