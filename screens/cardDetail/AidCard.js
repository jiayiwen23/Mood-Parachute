import { Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ExitCard from "../../components/ExitCard";
import { colors } from "../../colors";
import Card from "../../components/Card";
import { collection, onSnapshot, query } from "@firebase/firestore";
import { database } from "../../firebase/firebaseSetup";

const AidCard = ({ navigation }) => {
  const [aidCard, setAidCard] = useState([]);

  useEffect(() => {
    const q = query(collection(database, "aidCard"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.docs.forEach((docSnap) => {
          newArray.push({ ...docSnap.data(), id: docSnap.id });
        });
        setAidCard(newArray);
      },
      (err) => {
        console.log(err);
        if (err.code === "permission-denied") {
          Alert.alert(
            "You don't have permission."
          );
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const randomIdx = Math.floor(Math.random() * aidCard.length);
  const title = aidCard.length > 0 ? aidCard[randomIdx].title : '';
  const body = aidCard.length > 0 ? aidCard[randomIdx].body.join('\n') : '';

  return (
    <Card>
      <Text style={styles.title}>/{title}/</Text>
      <Text style={styles.body}>{body}</Text>
      <ExitCard navigation={navigation} />
    </Card>
  );
};

export default AidCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    alignSelf: "center",
    marginTop: 10,
    padding: 10,
    color: colors.border,
    fontWeight: "bold",
  },
  body: {
    fontSize: 20,
    marginLeft: 10,
    padding: 20,
    lineHeight: 45,
  },
});
