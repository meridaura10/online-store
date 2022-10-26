import React from "react";
import styles from "./UserMenu.module.scss";
import { useUserData } from "../../hooks/use-user";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/Slices/userSlice";
import { setLocalStorage } from "../../utils/localStorage";
function UserMenu() {
  const user = useUserData();
  const dispatch = useDispatch();
  const signOut = () => {
    setLocalStorage("user", "");
    dispatch(removeUser());
  };
  return (
    <>
      <div className={styles.menu}>
        <div className={styles.infoUser}>
          <div className={styles.imgWrap}>
            <img className={styles.img} src={user.img} alt="" />
          </div>
          <p className={styles.name}>{user.name}</p>
          <p>{user.email}</p>
          <button onClick={signOut} type="button" className={styles.btn}>
            вийти з акаунту
          </button>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
