import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/use-cart";
import { HOME_ROUTE } from "../../constants/route";
import {
  clearCart,
} from "../../store/Slices/cartsSlice";
import ErrorCart from '../../components/errorCart/ErrorCart'
import styles from "./Cart.module.scss";
import CartBlock from '../../components/cartBlock/CartBlock'
import EmptyCart from '../../img/EmptyCart'
import { removeToFirebaseCollectionsCart } from "../../firebase/cart";
import { useUserData } from "../../hooks/use-user";
function Cart() {
  const cart = useCart();
  const dispatch = useDispatch();
  const userId = useUserData().id
  const clear = () => {
    window.confirm("ви точно хочете очистити корзину данні булуть втрачені") &&
      dispatch(clearCart());
      removeToFirebaseCollectionsCart(userId)
  };
  return (
    <div className={styles.cart}>
      {cart.status === "error" && <ErrorCart error={cart.error} />}
      {cart.status === "loading" && (
        <h1 className={styles.loading}>loading....</h1>
      )}
      {cart.status === "resolved" &&
        (cart.items.length > 0 ? (
          <>
            <div className={styles.actionsCart}>
              <p onClick={clear} className={styles.actionsCartText}>
                очистити корзину
              </p>
            </div>
            <ul className={styles.list}>
              {cart.items.map((obj) => (
                <CartBlock key={obj.id} obj={obj} />
              ))}
            </ul>
            <div className={styles.buyWrap}>
              <Link style={{ textDecoration: "none" }} to={HOME_ROUTE}>
                <p className={styles.text}>продовжити покупки</p>
              </Link>
              <div className={styles.actions}>
                <div className={styles.totalPrice}>{cart.totalPrice}$</div>
                <div className={styles.btnWrap}>
                  <button className={styles.btn}>оформити замовлення</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyWrap}>
              <div className={styles.emptyTextWrap}>
                <p className={styles.emptyTextHeader}>корзина порожня</p>
                <p className={styles.emptyText}>
                  щоб додати товар
                  <span className={styles.emptyTextMoreWords}>в корзину</span>
                  перейдіть до головної сторінки та натисніть
                  <span className={styles.emptyTextMoreWords}>на</span> кнопку
                  купити
                  <span className={styles.emptyTextMoreWords}>
                    біля бажаного товару
                  </span>
                </p>
              </div>
              <div className={styles.emptyImgWrap}>
                <EmptyCart />
              </div>
              <div className={styles.emptyWrapBtn}>
                <Link to={HOME_ROUTE}>
                  <button className={styles.emptyBtn}>повернутись назад</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Cart;
