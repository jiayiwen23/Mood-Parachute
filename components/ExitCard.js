import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PressableButton from './PressableButton';
import { colors } from '../colors';
import { StyleSheet } from 'react-native';

const ExitCard = ({ navigation }) => {
    const handleExitCard=()=>{
      navigation.navigate("Cards");
    }

    const handleMusic=()=>{
     
    }

  return (
    <>
    <PressableButton pressedFunction={handleMusic} defaultStyle={styles.music}>
      <MaterialCommunityIcons name="music" size={35} color={colors.border} style={styles.shadow} />
      <MaterialCommunityIcons name="music" size={32} color={colors.cardIcon} style={styles.icon} />
    </PressableButton>

    <PressableButton pressedFunction={handleExitCard} defaultStyle={styles.exit}>
        <MaterialCommunityIcons name="exit-to-app" size={35} color={colors.border} style={styles.shadow} />
        <MaterialCommunityIcons name="exit-to-app" size={32} color={colors.cardIcon} style={styles.icon} />
    </PressableButton>
    </>
  )
}

const styles = StyleSheet.create({
    exit: {
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
      margin: 10,
    },
    shadow: {
      position: 'absolute',
      bottom: 10,
      left: 10,
    },
  });

export default ExitCard