import { Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { colors } from '../../colors'
import ExitCard from '../../components/ExitCard'
import Card from '../../components/Card'

const HappinessCard = () => {
  return (
    <Card>
      <Text style={styles.title}>/The Moment Of{'\n'}Happiness You Had/</Text>
      <Text style={styles.body}>
        2023.10.23   Sunny  {'  '}
        <Image source={require("../../assets/happy.png")} style={{ width: 24, height: 24 }} />
        {'\n'}I feel really happy today.{'\n'}I love sunshine!
        </Text>
      <ExitCard />
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
});