// src/utils/uploadImageToStorage.js

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseSetup";

export async function uploadImageToStorage(uri) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = uri.substring(uri.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `images/${fileName}`);
    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (err) {
    console.error("Error uploading image to Firebase Storage", err);
    throw err;
  }
}
