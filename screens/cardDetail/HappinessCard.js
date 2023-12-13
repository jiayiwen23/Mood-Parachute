import { Text, StyleSheet, Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../colors";
import ExitCard from "../../components/ExitCard";
import Card from "../../components/Card";
import { auth, database } from "../../firebase/firebaseSetup";
import { collection, onSnapshot, query, where } from "@firebase/firestore";

const HappinessCard = ({ navigation }) => {
  const [journals, setJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [randomIndex, setRandomIndex] = useState(null);

  useEffect(() => {
    const q = query(
      collection(database, "entries"),
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
        setJournals(newArray);
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

  useEffect(() => {
    const filteredJournals = journals.filter((journal) => {
      //mood equals to 19(love) or 20(laughtToCry) or 22(reallyHappy) in firebase represent happy
      return journal.mood === 19 || journal.mood === 20 || journal.mood === 21;
    });
    setFilteredJournals(filteredJournals);
    const randomIdx = Math.floor(Math.random() * filteredJournals.length);
    setRandomIndex(randomIdx);
  }, [journals]);

  const moodImages = {
    19: require("../../assets/1_love.png"),
    20: require("../../assets/2_laughtocry.png"),
    21: require("../../assets/3_reallyhappy.png"),
  };

  return (
    <Card>
      <Text style={styles.title}>Your Past Moment of Happiness</Text>

      {filteredJournals.length > 0 ? (
        <View style={styles.container}>
          <Text style={styles.tags}>
            At {filteredJournals[randomIndex].date}
            {"\n"}
            You felt{"     "}
            <Image
              source={moodImages[filteredJournals[randomIndex].mood]}
              style={{ width: 20, height: 20 }}
            />
            {filteredJournals[randomIndex]?.location.length > 0 &&
              `at ${filteredJournals[randomIndex]?.location[0]}`}
            {".\n"}
            And you wrote down:
          </Text>

          <Text style={styles.body}>
            {filteredJournals[randomIndex].journal}
          </Text>
          {filteredJournals[randomIndex].image && (
            <Image
              source={{ uri: filteredJournals[randomIndex].image }}
              style={styles.photo}
            />
          )}
        </View>
      ) : (
        <Text style={styles.emptyInfo}>
          You haven't recorded any moments of happiness yet, go ahead and start
          recording them.
        </Text>
      )}
      <ExitCard navigation={navigation} />
    </Card>
  );
};

export default HappinessCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 25,
    color: colors.border,
    fontWeight: "bold",
    //lineHeight: 50,
    textAlign: "center",
    paddingBottom: 10,
  },
  tags: {
    fontSize: 12,
    padding: 10,
    lineHeight: 30,
    color: colors.border,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
    padding: 10,
    lineHeight: 25,
  },
  emptyInfo: {
    fontSize: 16,
    padding: 10,
    lineHeight: 30,
    color: colors.border,
    alignSelf: "center",
  },
  photo: {
    width: 300,
    height: 220,
    alignSelf: "center",
  },
});
