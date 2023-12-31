import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { auth, database, storage } from "./firebaseSetup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function writeCardToDB(card) {
  try {
    const docRef = await addDoc(collection(database, "cards"), {
      ...card,
      user: auth.currentUser.uid,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCardToDB(id) {
  try {
    await deleteDoc(doc(database, "cards", id));
    console.log("Document deleted with ID: ", id);
  } catch (err) {
    console.log(err);
  }
}

export async function updateCardToDB(id, card) {
  try {
    await updateDoc(doc(database, "cards", id), card);
    console.log("Document updated with ID: ", id);
  } catch (err) {
    console.log(err);
  }
}

// Helper function to write data to the firestore datebase
export async function writeToDB(entry) {
  try {
    const docRef = await addDoc(collection(database, "entries"), {
      ...entry,
      user: auth.currentUser.uid,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}

// Helper function to delete data
export async function deleteToDB(id) {
  try {
    await deleteDoc(doc(database, "entries", id));
    console.log("Document deleted with ID: ", id);
  } catch (err) {
    console.log(err);
  }
}

// Helper function to update data
export async function updateToDB(id, entry) {
  try {
    await updateDoc(doc(database, "entries", id), entry);
    console.log("Document updated with ID: ", id);
  } catch (err) {
    console.log(err);
  }
}

// export async function uploadImageToStorage(uri) {
//   try {
//     const response = await fetch(uri);
//     const blob = await response.blob();
//     const fileName = uri.substring(uri.lastIndexOf("/") + 1);
//     const storageRef = ref(storage, `images/${fileName}`);
//     await uploadBytes(storageRef, blob);

//     const downloadURL = await getDownloadURL(storageRef);
//     return downloadURL;
//   } catch (err) {
//     console.error("Error uploading image to Firebase Storage", err);
//     throw err;
//   }
// }

export async function uploadImageToStorage(uri) {
  const auth = getAuth();
  const user = auth.currentUser;

  try {
    if (!user) {
      throw new Error("No user logged in!");
    }

    // Fetch the image as a Blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Use the user UID and the image name to create the file path
    const fileName = uri.substring(uri.lastIndexOf("/") + 1);
    const userStorageRef = ref(storage, `users/${user.uid}/images/${fileName}`);

    // Upload the Blob to Firebase Storage
    await uploadBytes(userStorageRef, blob);

    // Get the download URL
    const downloadURL = await getDownloadURL(userStorageRef);
    return downloadURL;
  } catch (err) {
    console.error("Error uploading image to Firebase Storage", err);
    throw err;
  }
}

export const updateUserAvatarInDB = async (userId, avatarUrl) => {
  const userDocRef = doc(database, "users", userId);
  await setDoc(userDocRef, { avatar: avatarUrl }, { merge: true });
};

export const deleteUserAvatarInDB = async (userId) => {
  const userDocRef = doc(database, "users", userId);
  await setDoc(userDocRef, { avatar: null }, { merge: true });
};
