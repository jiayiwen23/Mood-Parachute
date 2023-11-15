import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../colors';

const CardBack = () => {
  return (
    <View style={styles.card}>
      
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: 300,
    backgroundColor: colors.cardBackgroud,
    borderRadius: 8,
    padding: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
    marginBottom: 60,
  },
});

export default CardBack