import { Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../colors'
import ExitCard from '../../components/ExitCard'
import Card from '../../components/Card'
import { auth, database } from '../../firebase/firebaseSetup'
import { collection, onSnapshot, query, where } from '@firebase/firestore'

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

  useEffect(() => {
    const filteredJournals = journals.filter((journal) => {
      //mood equals to 20 or 25 or 26 in firebase represent happy
      return journal.mood === 20 || journal.mood === 25 || journal.mood === 26;
    });
    setFilteredJournals(filteredJournals);
    const randomIdx = Math.floor(Math.random() * filteredJournals.length);
    setRandomIndex(randomIdx);
  }, [journals]);

  const moodImages = {
    20: require('../../assets/happy.png'),
    25: require('../../assets/love.png'),
    26: require('../../assets/reallyhappy.png'),
  };

  return (
    <Card>
      <Text style={styles.title}>/The Moment Of{'\n'}Happiness You Had/</Text>
      {filteredJournals.length > 0 && (
        <>
          <Text style={styles.body}>
            {filteredJournals[randomIndex].date}{'  '}
            <Image
              source={moodImages[filteredJournals[randomIndex].mood]}
              style={{ width: 24, height: 24 }}
            />
            {'\n'}{filteredJournals[randomIndex].journal}
          </Text>
          <Image source={{ uri: filteredJournals[randomIndex].image }} style={styles.photo} />
        </>
      )}
      <ExitCard navigation={navigation}/>
    </Card>
  )
}

export default HappinessCard

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    alignSelf: "center",
    padding: 10,
    color: colors.border,
    fontWeight: "bold",
    lineHeight: 50,
    textAlign: "center",
  },
  body: {
    fontSize: 18,
    marginLeft: 10,
    padding: 10,
    lineHeight: 50,
  },
  photo:{
    width: 300,
    height: 260,
    alignSelf: "center",
  },
});