import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/use-cart";
import { HOME_ROUTE } from "../../constants/route";
import { clearCart } from "../../store/Slices/cartsSlice";
import ErrorCart from "../../components/errorCart/ErrorCart";
import styles from "./Cart.module.scss";
import CartBlock from "../../components/cartBlock/CartBlock";
import { useUserData } from "../../hooks/use-user";
import EmptyContent from "../../components/emptyContent/EmptyContent";
import { useValue } from "../../hooks/use-value";
function Cart() {
  const cart = useCart();
  const value = useValue().value;
  const dispatch = useDispatch();
  const userId = useUserData().id;
  const clear = () => {
    window.confirm("ви точно хочете очистити корзину данні булуть втрачені") &&
      cart.items.forEach((item) => {
        dispatch(clearCart({ cartItem: item, userId }));
      });
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
              {value && (
                <div className={styles.searchInfo}>
                  <p>
                    товари що були знайдені по запиту{" "}
                    <span className={styles.value}>{value}</span>
                  </p>
                </div>
              )}
              <p onClick={clear} className={styles.actionsCartText}>
                очистити корзину
              </p>
            </div>

            <ul className={styles.list}>
              {cart.items
                .filter((e) => {
                  return (
                    e.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
                  );
                })
                .map((obj) => (
                  <CartBlock key={obj.id} obj={obj} />
                ))}
            </ul>
            {!value && (
              <div className={styles.buyWrap}>
                <Link style={{ textDecoration: "none" }} to={HOME_ROUTE}>
                  <p className={styles.text}>продовжити покупки</p>
                </Link>
                <div className={styles.actions}>
                  <div className={styles.totalPrice}>
                    {cart.totalPrice.toLocaleString()}{" "}
                    <span className={styles.currency}>₴</span>
                  </div>
                  <div className={styles.btnWrap}>
                    <button className={styles.btn}>оформити замовлення</button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <EmptyContent
            header={"корзина порожня"}
            btn={true}
            text={
              <>
                щоб додати товар в корзину перейдіть до головної сторінки та
                натисніть на кнопку купити біля бажаного товару
              </>
            }
            rout={HOME_ROUTE}
          />
        ))}
    </div>
  );
}

export default Cart;
