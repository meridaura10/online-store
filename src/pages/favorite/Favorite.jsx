import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyContent from "../../components/emptyContent/EmptyContent";
import FavoriteBlock from "../../components/favoriteBlock/FavoriteBlock";
import { CART_ROUTE } from "../../constants/route";
import { useFavorite } from "../../hooks/use-favorite";
import { useUserData } from "../../hooks/use-user";
import { useValue } from "../../hooks/use-value";
import { addCartGoods } from "../../store/Slices/cartsSlice";
import styles from "./Favorite.module.scss";
function Favorite() {
  const favoritesData = useFavorite();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useUserData();
  const value = useValue().value;
  const favoriteId = favoritesData.items.map((e) => e.id);
  const setGoods = (goods) => {
    goods.forEach((item) => {
      dispatch(addCartGoods({ ...item, userId: userData.id }));
    });
    window.confirm(
      `${favoritesData.count} товари переміщено до корзини. Бажаєте перейти ?`
    ) && navigate(CART_ROUTE);
  };
  return (
    <div className={styles.root}>
      {favoritesData.status === "error" && (
        <h1>сталася помилка{favoritesData.error}</h1>
      )}
      {favoritesData.status === "loading" && (
        <h1 className={styles.loading}>loading....</h1>
      )}
      {favoritesData.status === "resolved" &&
        (favoritesData.items.length > 0 ? (
          <>
            {value && (
              <div className={styles.searchInfo}>
                <p>
                  товари що були знайдені по запиту{" "}
                  <span className={styles.value}>{value}</span>
                </p>
              </div>
            )}
            <ul className={styles.FavoriteList}>
              {favoritesData.items
                .filter((e) => {
                  return (
                    e.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
                  );
                })
                .map((item) => (
                  <FavoriteBlock
                    key={item.id}
                    userId={userData.id}
                    active={favoriteId.includes(item.id) ? true : false}
                    item={item}
                  />
                ))}
            </ul>
            {!value && (
              <div className={styles.all}>
                <div className={styles.allWrap}>
                  <div className={styles.text}>
                    <p className={styles.count}>
                      {favoritesData.count} товари на суму
                    </p>
                    <p className={styles.price}>
                      {favoritesData.totalPrice.toLocaleString()}
                      <span className={styles.currency}>₴</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setGoods(favoritesData.items)}
                    className={styles.btn}
                  >
                    купити все
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <EmptyContent
              btn={true}
              text={
                "щоб додати товар до вподобаного перейдіть до голової сторінки та натисніть на серце біля бажаного товару"
              }
              header={"ваш список вподобань порожній"}
            />
          </>
        ))}
    </div>
  );
}

export default Favorite;
