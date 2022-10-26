import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeToFirebaseCart,
  writeToFirebaseDatabaseCart,
} from "../../firebase/cart";
import Plus from "../../img/Plus";
import {
  addCartGoods,
  minusGood,
  removeGoods,
} from "../../store/Slices/cartsSlice";
import TrashCan from "../../img/TrashCan";
import Heart from "../../img/Heart";
import ThreeDots from "../../img/ThreeDots";
import Minus from "../../img/Minus";
import styles from "./CartBlock.module.scss";
import { useUserData } from "../../hooks/use-user";
import { addFavorite } from "../../store/Slices/favoritesSlice";
import { useFavorite } from "../../hooks/use-favorite";
function CartBlock({ obj }) {
  const [activeMenu, setActiveMenu] = useState(false);
  const favoritesData = useFavorite();
  const dispatch = useDispatch();
  const userId = useUserData().id;
  const favoriteId = favoritesData.items.map((e) => e.id);
  const active = () => {
    setActiveMenu(true);
  };
  const minus = (item) => {
    writeToFirebaseDatabaseCart(item);
    item.count > 1 && dispatch(minusGood(item));
  };
  const plus = (item) => {
    writeToFirebaseDatabaseCart(item);
    dispatch(addCartGoods(item));
  };
  const show = () => {
    activeMenu && setActiveMenu(false);
  };
  const removeGood = (id) => {
    removeToFirebaseCart({ userId, id });
    dispatch(removeGoods(id));
    setActiveMenu(false);
  };
  const setFavorite = (obj) => {
    dispatch(addFavorite({ item: obj, userId }));
  };
  return (
    <li onClick={show} className={styles.item} key={obj.id}>
      <div className={styles.info}>
        <img className={styles.img} src={obj.img} alt={obj.name} />
        <p className={styles.name}>{obj.name}</p>
        <div onClick={active} className={styles.actionsItemInfo}>
          <ThreeDots />
        </div>
        {activeMenu && (
          <div className={styles.menu}>
            <div onClick={() => removeGood(obj.id)} className={styles.menuItem}>
              <TrashCan />
              <span className={styles.menuItemText}>видалити</span>
            </div>
            {favoriteId.includes(obj.id) ? (
              ""
            ) : (
              <div
                onClick={() => {
                  setFavorite(obj);
                }}
                className={styles.menuItem}
              >
                <div className={styles.heart}>
                  <Heart active={false} />
                </div>
                <span className={styles.menuItemText}>у список бажаного</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.actionsItem}>
        <div className={styles.counter}>
          <div
            onClick={() => minus(obj)}
            className={`${styles.minus} ${obj.count > 1 ? styles.active : ""}`}
          >
            <Minus />
          </div>
          <span className={styles.count}>{obj.count}</span>
          <div
            onClick={() => plus(obj)}
            className={`${styles.plus} ${styles.active}`}
          >
            <Plus />
          </div>
        </div>
        <div className={styles.price}>
          {(obj.price * obj.count).toLocaleString()}
          <span className={styles.currency}>₴</span>
        </div>
      </div>
    </li>
  );
}

export default CartBlock;
