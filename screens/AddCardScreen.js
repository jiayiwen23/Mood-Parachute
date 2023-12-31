import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import PressableButton from "../components/PressableButton";
import { colors } from "../colors";
import { EvilIcons } from "@expo/vector-icons";
import ImageManager from "../components/ImageManager";
import {
  uploadImageToStorage,
  writeCardToDB,
  updateCardToDB,
} from "../firebase/firebaseHelper";

const screenWidth = Dimensions.get("window").width;

export default function AddCardScreen({ navigation, route }) {
  const isEditMode = route.params && route.params.card;
  const [selectedImage, setSelectedImage] = useState(
    route.params?.card?.image || null
  );
  const [cardName, setCardName] = useState(route.params?.card?.cardName || "");
  const [cardText, setCardText] = useState(route.params?.card?.cardText || "");

  const passImageUri = (imageUri) => {
    console.log("image uri", imageUri);
    setSelectedImage(imageUri);
  };

  const handleSave = async () => {
    if (!cardName || !cardText || !selectedImage) {
      Alert.alert("Invalid input", "All fields should not be empty");
      return;
    }
    try {
      const card = {
        cardName: cardName,
        cardText: cardText,
        image: "",
      };
      if (selectedImage) {
        const uploadedImageUrl = await uploadImageToStorage(selectedImage);
        card.image = uploadedImageUrl;
      }
      await writeCardToDB(card);
      navigation.goBack();
    } catch (error) {
      console.log("add card error", error);
    }
  };
  const handleCancel = () => {
    setSelectedImage(null);
    setCardName("");
    setCardText("");
    navigation.goBack();
  };

  const handleUpdate = async () => {
    if (!cardName || !cardText || !selectedImage) {
      Alert.alert("Invalid input", "All fields should not be empty");
      return;
    }
    Alert.alert("Important", "Are you sure you want to save the changes?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Save",
        onPress: async () => {
          try {
            const card = {
              cardName: cardName,
              cardText: cardText,
              image: selectedImage,
            };
            if (selectedImage) {
              const uploadedImageUrl = await uploadImageToStorage(
                selectedImage
              );
              card.image = uploadedImageUrl;
            }
            await updateCardToDB(route.params.card.id, card);
            navigation.goBack();
          } catch (error) {
            console.log("update card error", error);
          }
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={60}
    >
      <ScrollView>
        <View style={styles.imageContainer}>
          <ImageManager
            passImageUri={passImageUri}
            pressedStyle={{ opacity: 0.8 }}
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.imagePreview}
              />
            ) : (
              <EvilIcons name="image" size={200} color={colors.border} />
            )}
          </ImageManager>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.text}>Card Set Name</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="Enter Card Set Name"
            onChangeText={setCardName}
            value={cardName}
          />
          <Text style={styles.text}>Card Text</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Card Text"
            onChangeText={setCardText}
            value={cardText}
          />
        </View>

        <View style={styles.buttonContainer}>
          <PressableButton
            pressedFunction={handleCancel}
            defaultStyle={styles.buttonDefault}
            pressedStyle={styles.buttonPressed}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </PressableButton>
          <PressableButton
            pressedFunction={isEditMode ? handleUpdate : handleSave}
            defaultStyle={styles.buttonDefault}
            pressedStyle={styles.buttonPressed}
          >
            <Text style={styles.buttonText}>Save</Text>
          </PressableButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  buttonText: { color: colors.white, fontSize: 16 },
  buttonContainer: {
    alignSelf: "center",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 40,
  },
  buttonDefault: {
    backgroundColor: colors.border,
    borderRadius: 5,
    padding: 5,
    width: 120,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "flex-start",
  },
  cardInfo: {
    width: "100%",
    alignItems: "center",
  },
  nameInput: {
    height: 40,
    width: screenWidth * 90 * 0.01,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  textInput: {
    height: 100,
    width: screenWidth * 90 * 0.01,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 10,
    borderStyle: "dashed",
    width: screenWidth * 0.6,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  text: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 19,
    paddingTop: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
