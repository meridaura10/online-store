import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./index";

export const writeToFirebaseFavorites = async (item,userId) =>{
    await setDoc(doc(db,`favorite/${userId}/goods/${item.id}`),item )
  }
  
  export const removeFavoriteFirebase = async (id,userId) =>{
    await deleteDoc(doc(db, "favorite", `${userId}/goods/${id}`));
  }