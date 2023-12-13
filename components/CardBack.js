import { View, StyleSheet } from 'react-native'
import React from 'react'
import PressableButton from './PressableButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../colors';

const CardBack = ({ navigation }) => {

  const cardPressHandler = () => {
    const cardTypes = [    
      { type: "Scenery Card", probability: 30 },    
      { type: "Happiness Card", probability: 40 },
      { type: "Aid Card", probability: 30 },  
    ];
  
    const totalProbability = cardTypes.reduce((sum, card) => sum + card.probability, 0);
  
    // Generate a random number between 0 and totalProbability
    const randomValue = Math.random() * totalProbability;
  
    // Determine the selected card based on probabilities
    let cumulativeProbability = 0;
    let selectedCard;
  
    for (const card of cardTypes) {
      cumulativeProbability += card.probability;
      if (randomValue < cumulativeProbability) {
        selectedCard = card.type;
        break;
      }
    }
    navigation.navigate(selectedCard);
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