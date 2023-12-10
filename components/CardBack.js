import { View, StyleSheet } from 'react-native'
import React from 'react'
import PressableButton from './PressableButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../colors';

const CardBack = ({ navigation }) => {

  const cardPressHandler = () => {
    const randomIndex = Math.floor(Math.random() * 6);
    
    switch (randomIndex) {// Navigate based on the random condition
      case 0:
        navigation.navigate("Lucky Card");
        break;
      case 1:
      case 2:
        navigation.navigate("Scenery Card");
        break;
      case 3:
      case 4:
        navigation.navigate("Happiness Card");
        break;
      case 5:
        navigation.navigate("Aid Card");
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