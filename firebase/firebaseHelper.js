import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

// Helper function to write data to the firestore datebase
export async function writeToDB(entry) {
  try {
    const docRef = await addDoc(collection(database, "entries"), entry);
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
