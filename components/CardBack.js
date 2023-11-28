import { View, StyleSheet } from 'react-native'
import React from 'react'
import PressableButton from './PressableButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../colors';

const CardBack = ({ navigation }) => {

  const cardPressHandler = () => {
    const randomIndex = Math.floor(Math.random() * 4);
    
    switch (randomIndex) {// Navigate based on the random condition
      case 0:
        navigation.navigate("Landscape Card");//Lucky
        break;
      case 1:
        navigation.navigate("Landscape Card");
        break;
      case 2:
        navigation.navigate("Landscape Card");//Happiness
        break;
      case 3:
        navigation.navigate("Landscape Card");//Aid
        break;
      default:
        break;
    }
  }
  
  return (
    <View>
      <PressableButton pressedFunction={cardPressHandler} defaultStyle={styles.card} pressedStyle={styles.cardPressed}>
          <MaterialCommunityIcons name="cards-playing-diamond-outline" size={210} color={colors.cardBack} />
      </PressableButton>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    
  },
  cardPressed: {
    transform: [{ scale: 1.2 }],
  },
});

export default CardBack