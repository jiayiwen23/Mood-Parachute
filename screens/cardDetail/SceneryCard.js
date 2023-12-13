import {
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createClient } from "pexels";
import ExitCard from "../../components/ExitCard";
import { set } from "date-fns";

const SceneryCard = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [imageSource, setImageSource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const client = createClient(
      "aRoERDHiOZcBmTeI5Za084zwLdsHzKlfnWSgyZkbGxLJU2LlyeyE8awu"
    );
    const query = "Nature";

    const fetchImage = async () => {
      try {
        setIsLoading(true);
        const response = await client.photos.search({ query, per_page: 100 });
        const randomIndex = Math.floor(Math.random() * response.photos.length);
        const randomPhoto = response.photos[randomIndex];
        setImageSource({ uri: randomPhoto.src.portrait });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Image source={imageSource} style={styles.image} />
      )}
      <ExitCard navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default SceneryCard;
