import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../colors";
import CardBack from "../components/CardBack";

export default function CardsScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>FLIP A CARD</Text>

      <View style={styles.row}>
        <CardBack navigation={navigation}/>
        <CardBack navigation={navigation}/>
      </View>

      <View style={styles.row}>
        <CardBack navigation={navigation}/>
        <CardBack navigation={navigation}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    alignSelf: "center",
    color: colors.title,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
});
