import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import PressableButton from './PressableButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../colors';

const CardBack = () => {
  const [isPressed, setIsPressed] = useState(false);

  const cardPressHandler = () => {
    setIsPressed(true);
  };

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