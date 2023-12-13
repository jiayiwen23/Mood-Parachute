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
      Alert.alert("All fields should not be empty");
      return;
    }
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred);
    } catch (err) {
      console.log(err);
      if (
        err.code === "auth/invalid-login-credentials" ||
        "auth/invalid-credential"
      ) {
        Alert.alert("Invalid credentials");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <TextInput
        placeholder="EMAIL"
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

      <View style={styles.buttonContainer}>
        <PressableButton
          pressedFunction={loginHandler}
          pressedStyle={styles.pressedStyle}
          defaultStyle={styles.defaultStyle}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </PressableButton>

        <PressableButton
          pressedFunction={signupHandler}
          pressedStyle={styles.pressedStyle}
          defaultStyle={styles.defaultStyle}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </PressableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  input: {
    borderColor: colors.border,
    borderBottomWidth: 2,
    width: "75%",
    margin: 10,
    padding: 5,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    color: colors.inputText,
  },
  buttonContainer: {
    marginTop: 50,
  },
  buttonText: {
    fontSize: 22,
    textAlign: "center",
    color: colors.white,
  },
  defaultStyle: {
    width: 180,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: colors.border,
    padding: 10,
    alignSelf: "center",
  },
  pressedStyle: {
    opacity: 0.8,
  },
});
