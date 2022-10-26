import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Google from "../../img/icons/Google";
import styles from "./Registration.module.scss";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import { setEmptyCartUser } from "../../firebase/cart";
import { getFirebaseGoods } from "../../store/Slices/cartsSlice";
import { useNavigate } from "react-router-dom";
import { MENU_USER_ROUTE } from "../../constants/route";
function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registrationGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        dispatch(
          setUser({
            id: user.uid,
            img: user.photoURL,
            name: user.displayName,
            email: user.email,
          })
        );
        setEmptyCartUser(user.uid);
        alert("ви успішно ввійшли в систему");
        dispatch(getFirebaseGoods());
        navigate(MENU_USER_ROUTE);
      })
      .catch((error) => {
        console.log(error);
        alert(`при вході сталась помилка: ${error.message}`);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <p className={styles.text}>
          авторизуйтесь або зарагеструйтесь будь ласка
        </p>
      </div>
      <div className={styles.iconWrap}>
        <button
          onClick={registrationGoogle}
          type="button"
          className={styles.icon}
        >
          <Google />
        </button>
      </div>
    </div>
  );
}

export default Registration;
