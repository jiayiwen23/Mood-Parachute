import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../colors'
import ExitCard from '../../components/ExitCard'

const HappinessCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>/The Moment Of Happiness{'\n'}You Had/</Text>
      <Text style={styles.body}>I feel really happy today.</Text>
      <ExitCard />
    </View>
  )
}

export default HappinessCard

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 25,
    alignSelf: "center",
    padding: 10,
    color: colors.border,
    fontWeight: "bold",
    lineHeight: 35,
    textAlign: "center",
  },
  body: {
    fontSize: 20,
    marginLeft: 10,
    padding: 5,
  },
});