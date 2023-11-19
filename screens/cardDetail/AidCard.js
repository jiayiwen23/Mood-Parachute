import { Text, StyleSheet } from 'react-native'
import React from 'react'
import ExitCard from '../../components/ExitCard'
import { colors } from '../../colors'
import Card from '../../components/Card'

const AidCard = () => {
  return (
    <Card>
      <Text style={styles.title}>/Write It Down/</Text>
      <Text style={styles.body}>
        1. I notice that there is a "little man" in my head, and it is saying: ________{'\n'}
        2. I name it: ________{'\n'}
        3. Remember, it is a natural product of the brain when it encounters an event.</Text>
      <ExitCard />
    </Card>
  )
}

export default AidCard

const styles = StyleSheet.create({
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
    lineHeight: 50,
  },
});