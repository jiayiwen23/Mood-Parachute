import { Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import ExitCard from "../../components/ExitCard";
import { colors } from "../../colors";
import Card from "../../components/Card";
import { collection, onSnapshot, query } from "@firebase/firestore";
import { database } from "../../firebase/firebaseSetup";
import { set } from "date-fns";

const AidCard = ({ navigation }) => {
  const [aidCard, setAidCard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(database, "aidCard"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.docs.forEach((docSnap) => {
          newArray.push({ ...docSnap.data(), id: docSnap.id });
        });
        setAidCard(newArray);
        setIsLoading(false);
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

  const randomIdx = Math.floor(Math.random() * aidCard.length);
  const title = aidCard.length > 0 ? aidCard[randomIdx].title : "";
  const body = aidCard.length > 0 ? aidCard[randomIdx].body.join("\n") : "";

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Card>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
          <ExitCard navigation={navigation} />
        </Card>
      )}
    </View>
  );
};

export default AidCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    alignSelf: "center",
    marginTop: 10,
    padding: 10,
    color: colors.border,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
    marginLeft: 10,
    padding: 20,
    lineHeight: 40,
  },
});
