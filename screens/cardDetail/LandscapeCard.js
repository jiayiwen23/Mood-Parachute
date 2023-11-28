import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createClient } from 'pexels';
import ExitCard from '../../components/ExitCard';

const LandscapeCard = ({navigation}) => {
  const { width, height } = useWindowDimensions();
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    const client = createClient('aRoERDHiOZcBmTeI5Za084zwLdsHzKlfnWSgyZkbGxLJU2LlyeyE8awu');
    const query = 'Nature';

    const fetchImage = async () => {
      try {
        const response = await client.photos.search({ query, per_page: 100 });
        const randomIndex = Math.floor(Math.random() * response.photos.length);
        const randomPhoto = response.photos[randomIndex];
        setImageSource({ uri: randomPhoto.src.large2x });
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    fetchImage();
  }, []);

  return (
    <View style={styles.container}>
      {imageSource ? (
        <Image source={imageSource} style={styles.image} />
      ) : (
        <Image source={require('../../assets/maple.jpg')} style={styles.image} />
      )}
      <ExitCard navigation={navigation}/>
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