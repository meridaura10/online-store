import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeToFirebaseCart, writeToFirebaseDatabaseCart } from "../../firebase/cart";
import Plus from "../../img/Plus";
import { addCartGoods, minusGood, removeGoods } from "../../store/Slices/cartsSlice";
import TrashCan from "../../img/TrashCan";
import Heart from "../../img/Heart";
import ThreeDots from "../../img/ThreeDots";
import Minus from "../../img/Minus";
import styles from './CartBlock.module.scss'
import {useUserData} from '../../hooks/use-user'
function CartBlock({obj}) {
  const [activeMenu,setActiveMenu] = useState(false) 
  const dispatch = useDispatch();
  const userId = useUserData().id
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
  const showMenu = (e) =>{
        e.target.dataset.menu && setActiveMenu(false)  
  }
  const removeGood = (id) =>{
    removeToFirebaseCart({userId,id})
    dispatch(removeGoods(id))
    setActiveMenu(false)
  }
  return (
    <li onClick={(e) =>showMenu(e)} className={styles.item} key={obj.id}>
      <div className={styles.info}>
        <img className={styles.img} src={obj.img} alt={obj.name} />
        <p className={styles.name}>{obj.name}</p>
        <div onClick={active} className={styles.actionsItemInfo}>
          <ThreeDots />
        </div>
        {activeMenu && (
          <div onMouseLeave={showMenu} data-menu='menu' className={styles.menu}>
            <div onClick={() => removeGood(obj.id)} className={styles.menuItem}>
              <TrashCan />
              <span className={styles.menuItemText}>видалити</span>
            </div>
            <div className={styles.menuItem}>
              <Heart active={false} />{" "}
              <span className={styles.menuItemText}>у список бажаного</span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.actionsItem}>
        <div className={styles.counter}>
          <div
            onClick={(event) => minus(obj)}
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
        <div className={styles.price}>{obj.price * obj.count}</div>
      </div>
    </li>
  );
}

export default CartBlock;
