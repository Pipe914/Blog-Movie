import { collection, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import {db} from '../firebase';

const addToFirebase = async ({ objectToSave }, collectionName) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), objectToSave);
    console.log(
      "Document written to table " + collectionName + " with ID: ",
      docRef.id
    );
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

//TODO: Implement this function
const getFromFirebase = async (collectionName) => {
  let data = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  console.log("Data Recuperada");
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};
const updateFromFirebase = async ({objectToSave}, collectionName, idElement) => {
  try{
    const docRef = await updateDoc(collection(db, collectionName, idElement), objectToSave);
    console.log(
      "Document written to table " + collectionName + " with ID: ",
      docRef.id
    );
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
const deleteFromFirebase = async (idElement, collectionName) => {
  try{
    const docRef = await deleteDoc(collection(db, collectionName, idElement));
    console.log(
      "Document written to table " + collectionName + " with ID: ",
      docRef.id
    );
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

export { addToFirebase, getFromFirebase, updateFromFirebase, deleteFromFirebase };
