import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../colors';

const Header = () => {
  return (
    <View style={styles.titleContainer}>
        <Text style={styles.title}>MOOD</Text>
        <Text style={styles.title}>PARACHUTE</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
      height: 100,
      marginBottom: 30,
    },
    title: {
      color: colors.title,
      alignSelf: "center",
      fontSize: 35,
      fontWeight: 'bold',
      marginBottom: 10,
      letterSpacing: 2,
    },
  });

export default Header