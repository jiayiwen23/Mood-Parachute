import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PressableButton from './PressableButton';

const ExitCard = () => {
    const handleExitCard=()=>{

    }

  return (
    <PressableButton pressedFunction={handleExitCard} defaultStyle={styles.exitCard}>
        <MaterialCommunityIcons name="music" size={30} color="grey" style={styles.icon} />
        <MaterialCommunityIcons name="exit-to-app" size={30} color="grey" />
    </PressableButton>
  )
}

const styles = {
    exitCard: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      flexDirection: "row",
    },
    icon: {
      marginRight: 10,
    },
  };

export default ExitCard