import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../colors'
import ExitCard from '../../components/ExitCard'

const LuckyCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>/Write It Down/</Text>
      <Text style={styles.message}>
        Brace yourself!{'\n'}
        You've stumbled upon a mysterious lucky card.{'\n'}
        Today, anticipate a day filled with tranquility and serenity. 🍀✨
      </Text>
      <ExitCard />
    </View>
  )
}

export default LuckyCard

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
  message:{
    padding: 20,
    backgroundColor: colors.background,
    fontSize: 20,
    lineHeight: 50,
    marginLeft: 10,
  },
});