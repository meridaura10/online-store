import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CART_ROUTE } from "../../constants/route";
import Heart from "../../img/Heart";
import { addCartGoods } from "../../store/Slices/cartsSlice";
import { removeFavorite } from "../../store/Slices/favoritesSlice";
import styles from "./FavoriteBlock.module.scss";
function FavoriteBlock({ item, userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setItem = (item) => {
    dispatch(addCartGoods({ ...item, userId }));
    window.confirm(`товар переміщено до корзини. Бажаєте перейти ?`) &&
      navigate(CART_ROUTE);
  };
  const removeItem = (id) => {
    dispatch(removeFavorite({ id, userId }));
  };
  return (
    <li className={styles.item}>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={item.img} alt={item.name} />
      </div>
      <div className={styles.content}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.price}>
          {item.price.toLocaleString()}
          <span className={styles.currency}>
          ₴
          </span>
        </p>
      </div>
      <div className={styles.btnWrap}>
        <button onClick={() => setItem(item)} className={styles.btn}>
          до козини
        </button>
      </div>
      <div onClick={() => removeItem(item.id)} className={styles.heart}>
        <Heart active={true} />
      </div>
    </li>
  );
}

export default FavoriteBlock;
