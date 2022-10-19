import React from "react";
import Cart from "../../img/Cart";
import UserImg from "../../img/User";
import { useCart } from "../../hooks/use-cart";
import styles from "./Header.module.scss";
import { NavLink, Link } from "react-router-dom";
import { CART_ROUTE, HOME_ROUTE, MENU_USER_ROUTE, REGISTRATION_ROUTE } from "../../constants/route";
import { useUserData } from "../../hooks/use-user";
function Header() {
  const count = useCart().count;
  const user = useUserData()
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to={HOME_ROUTE} className={styles.logoWrap}>
            <p className={styles.logo}>online store</p>
          </Link>
          <div className={styles.inputWrap}>
            <input
              placeholder="я шукаю..."
              className={styles.input}
              type="text"
            />
          </div>
          <div className={styles.actions}>
            {user.isAuth ? (
              <Link to={MENU_USER_ROUTE}>
                <img
                src={user.img}
                className={styles.userActive}
                alt="userIcon"
              />
              </Link>
            ) : (
              <Link to={REGISTRATION_ROUTE}>
                <div className={styles.user}>
                  <UserImg />
                </div>
              </Link>
            )}
            <NavLink to={CART_ROUTE} className={styles.cartWrap}>
              <div className={styles.cart}>
                <Cart />
              </div>
              <p className={styles.count}>{count}</p>
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
