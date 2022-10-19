import React, { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Google from "../../img/icons/Google";
import styles from "./Registration.module.scss";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import { setEmptyCartUser } from "../../firebase/cart";
import { getFirebaseGoods } from "../../store/Slices/cartsSlice";
function Registration() {
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const dispatch = useDispatch()
  const submit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
        
    //     const user = userCredential.user;
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
    // setValueEmail("");
    // setValuePassword("");
  };
  const registrationGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch(setUser({
          id: user.uid,
          img: user.photoURL,
          name: user.displayName,
          email: user.email,
        })) 
        setEmptyCartUser(user.uid)
        alert('ви успішно ввійшли в систему')
        dispatch(getFirebaseGoods())
      })
      .catch((error) => {
        alert(`при вході сталась помилка: ${error.message}`)
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <p className={styles.text}>
          авторизуйтесь або зарагеструйтесь будьласка
        </p>
        <form onSubmit={submit} className={styles.form}>
          <p>ввійти</p>
          <input
            placeholder="введіть ваш email"
            value={valueEmail}
            onChange={(e) => setValueEmail(e.target.value)}
            className={styles.input}
            type="email"
          />
          <input
            placeholder="введіть ваш пароль"
            value={valuePassword}
            onChange={(e) => setValuePassword(e.target.value)}
            className={styles.input}
            type="password"
          />
          <button className={styles.submit} type="submit">
            авторизуватись
          </button>
          <p>зарагеструйтесь</p>
          <div className={styles.iconWrap}>
            <button
              onClick={registrationGoogle}
              type="button"
              className={styles.icon}
            >
              <Google />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
