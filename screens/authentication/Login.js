import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import PressableButton from "../../components/PressableButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseSetup";
import { colors } from "../../colors";

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
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />

      <PressableButton pressedFunction={loginHandler}>
        <Text>Login</Text>
      </PressableButton>

      <PressableButton pressedFunction={signupHandler}>
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
    borderWidth: 2,
    width: "90%",
    margin: 5,
    padding: 5,
  },
  label: {
    marginLeft: 10,
  },
});