import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ExitCard from '../../components/ExitCard'
import { colors } from '../../colors'

const AidCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>/Write It Down/</Text>
      <Text style={styles.body}>
        1. I notice that there is a "little man" in my head, and it is saying: ________{'\n'}
        2. I name it: ________{'\n'}
        3. Remember, it is a natural product of the brain when it encounters an event.</Text>
      <ExitCard />
    </View>
  )
}

export default AidCard

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
  },
  body: {
    fontSize: 20,
    marginLeft: 10,
    padding: 20,
    lineHeight: 35,
  },
});