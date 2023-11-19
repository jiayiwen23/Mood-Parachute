import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import React from 'react';
import ExitCard from '../../components/ExitCard';

const LandscapeCard = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/maple.jpg')} 
        style={styles.image}
      />
      <ExitCard />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    position: 'relative',
  },
  image:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default LandscapeCard