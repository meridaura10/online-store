import { initializeApp } from "firebase/app";
import { getFirestore,onSnapshot,query,where,setDoc,doc} from '@firebase/firestore';
import { uid } from 'uid'

const firebaseConfig = {
  apiKey: "AIzaSyDGVm6a9QGFIPJXTkVIEO9paOout7sXx0o",
  authDomain: "online-store-cac41.firebaseapp.com",
  databaseURL: "https://online-store-cac41-default-rtdb.firebaseio.com",
  projectId: "online-store-cac41",
  storageBucket: "online-store-cac41.appspot.com",
  messagingSenderId: "1046517266519",
  appId: "1:1046517266519:web:97ffbfe0af5b65a67c0b12"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)



export const writeDatabase = ({
  name,
  img,
  price,
  category
  }) =>{
  const id = uid()
  setDoc(doc(db,`goods/${id}/`),{
    name,
    img,
    price,
    id,
    category
  })
}




