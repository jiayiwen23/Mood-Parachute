import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { colors } from '../../colors';
import PressableButton from "../../components/PressableButton";

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const signupHandler = async () => {
        if (!email || !password || !confirmPassword) {
          Alert.alert("Fields should not be empty");
          return;
        }
        if (confirmPassword !== password) {
          Alert.alert("password and confirm password should be equal");
          return;
        }
        try {
          const userCred = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log(userCred);
        } catch (err) {
          console.log("sign up error", err.code);
          if (err.code === "auth/invalid-email") {
            Alert.alert("the entered email is invalid");
          } else if (err.code === "auth/weak-password") {
            Alert.alert("password should be minimum 6 characters");
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

      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="CONFIRM PASSWORD"
        value={confirmPassword}
        onChangeText={(changedText) => {
          setConfirmPassword(changedText);
        }}
      />

      <View style={styles.buttonContainer}>
        <PressableButton 
          pressedFunction={signupHandler}
          pressedStyle={styles.pressedStyle}
          defaultStyle={styles.defaultStyle} >
          <Text style={styles.buttonText}>Sign up</Text>
        </PressableButton>
      </View>

    </View>
  )
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
    },
    defaultStyle:{
      marginBottom: 20,
      borderRadius: 5,
      backgroundColor: colors.button,
      width: "28%",
      padding: 10,
      alignSelf: "center",
    },
    pressedStyle:{
      backgroundColor: colors.buttonPressed,
    },
  });

export default Signup