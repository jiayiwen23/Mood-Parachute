import { Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../colors'
import ExitCard from '../../components/ExitCard'
import Card from '../../components/Card'

const LuckyCard = ({navigation}) => {
  return (
    <Card>
      <Text style={styles.title}>/Lucky Card/</Text>
      <Text style={styles.message}>
        Brace yourself!{'\n'}
        You've stumbled upon a mysterious lucky card.{'\n'}
        Today, anticipate a day filled with tranquility and serenity. 🍀✨
      </Text>
      <ExitCard navigation={navigation}/>
    </Card>
      
  )
}

export default LuckyCard

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    alignSelf: "center",
    padding: 10,
    color: colors.border,
    fontWeight: "bold",
    lineHeight: 35,
    textAlign: "center",
  },
  message:{
    padding: 20,
    fontSize: 20,
    lineHeight: 50,
    marginLeft: 10,
  },
});