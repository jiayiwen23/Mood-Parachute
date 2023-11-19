import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PressableButton from './PressableButton';

const ExitCard = ({ navigation }) => {
    const handleExitCard=()=>{
      navigation.navigate("Cards");
    }

    const handleMusic=()=>{
     
    }

  return (
    <>
    <PressableButton pressedFunction={handleMusic} defaultStyle={styles.music}>
      <MaterialCommunityIcons name="music" size={30} color="grey" style={styles.icon} />
    </PressableButton>

    <PressableButton pressedFunction={handleExitCard} defaultStyle={styles.exitCard}>
        <MaterialCommunityIcons name="exit-to-app" size={30} color="grey" />
    </PressableButton>
    </>
  )
}

const styles = {
    exitCard: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
    music:{
      position: 'absolute',
      bottom: 10,
      left: 10,
    },
    icon: {
      marginRight: 10,
    },
  };

export default ExitCard