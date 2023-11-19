import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PressableButton from './PressableButton';

const ExitCard = () => {
    const handleExitCard=()=>{

    }

  return (
    <PressableButton pressedFunction={handleExitCard} defaultStyle={styles.exitCard}>
      <MaterialCommunityIcons name="exit-to-app" size={30} color="white" />
    </PressableButton>
  )
}

const styles = {
    exitCard: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
  };

export default ExitCard