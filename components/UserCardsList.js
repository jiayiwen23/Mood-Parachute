import { View, StyleSheet, FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, database } from "../firebase/firebaseSetup";
import UserCardItem from "./UserCardItem";
import { colors } from "../colors";

export default function UserCardsList({ navigation }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const q = query(
      collection(database, "cards"),
      where("user", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          console.log("data", data);
          newArray.push({ ...docSnap.data(), id: docSnap.id });
        });
        setCards(newArray);
      },
      (err) => {
        console.log(err);
        if (err.code === "permission-denied") {
          Alert.alert("You don't have permission.");
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        renderItem={({ item }) => (
          <UserCardItem card={item} navigation={navigation} />
        )}
        keyExtractor={(card) => card.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <Text>Love</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  image: {
    width: 50,
    height: 50,
  },
});
