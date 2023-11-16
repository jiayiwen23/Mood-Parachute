import { View, Image } from 'react-native'
import React from 'react'

const CardDetail = () => {
  return (
    <View>
      <Image 
        source={require('../assets/maple.png')} 
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image:{
    
  },
});

export default CardDetail