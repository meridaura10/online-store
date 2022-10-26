import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./index";

export const writeToFirebaseDatabaseCart = async (item) => {
  await setDoc(doc(db, `cart/${item.userId}/goods/${item.id}`), item);
};

export const removeToFirebaseCart = async ({id,userId}) => {
  await deleteDoc(doc(db, "cart", `${userId}/goods/${id}`));
};

export const setEmptyCartUser = (userId) => {
  setDoc(doc(db, `cart/${userId}/`), {});
};
