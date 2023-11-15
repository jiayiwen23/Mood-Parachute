import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const loginHandler = () => {
        navigation.replace("Login");
      };
      const signupHandler = async () => {
        if (!email || !password || !confirmPassword) {
          Alert.alert("Fields should not be empty");
          return;
        }
        if (confirmPassword !== password) {
          Alert.alert("password and confirmpassword should be equal");
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
          console.log("sign up error ", err.code);
          if (err.code === "auth/invalid-email") {
            Alert.alert("email is invalid");
          } else if (err.code === "auth/weak-password") {
            Alert.alert("password should be minimum 6 characters");
          }
        }
      };

  return (
    <View>
      <Header />
    </View>
  )
}

export default Signup