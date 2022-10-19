import { async } from "@firebase/util";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { set } from "firebase/firestore";
import { db } from "./index";


export const writeToFirebaseDatabaseCart = async (item) => {
  await setDoc(doc(db,`cart/${item.userId}/goods/${item.id}`),item )
};


export const removeToFirebaseCart = async ({userId,id}) => {
  await deleteDoc(doc(db, "cart", `${userId}/goods/${id}`));
};

export const removeToFirebaseCollectionsCart = async (userId) => {
  await deleteDoc(doc(db, "cart"));
};


export const setEmptyCartUser = (userId) => {
  setDoc(doc(db, `cart/${userId}/`), {});
};
