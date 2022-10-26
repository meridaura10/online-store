import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import Heart from "../../img/Heart";
import { addCartGoods } from "../../store/Slices/cartsSlice";
import { useSelectedCategory } from "../../hooks/use-selectedCategory";
import styles from "./Main.module.scss";
import { useUserData } from "../../hooks/use-user";
import { useNavigate } from "react-router-dom";
import { CART_ROUTE, REGISTRATION_ROUTE } from "../../constants/route";
import EmptyContext from "../emptyContent/EmptyContent";
import { addFavorite, removeFavorite } from "../../store/Slices/favoritesSlice";
import { useValue } from "../../hooks/use-value";
import { useFavorite } from "../../hooks/use-favorite";
function Main() {
  const [goods, setGoods] = useState([]);
  const favoritesData = useFavorite();
  const userData = useUserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCategory = useSelectedCategory();
  const value = useValue().value;
  useEffect(() => {
    (async () => {
      const goodsColectonRef = collection(db, "goods");
      const ref =
        selectedCategory === "all"
          ? goodsColectonRef
          : query(
              goodsColectonRef,
              where(`category`, "==", `${selectedCategory}`)
            );
      const doc = await getDocs(ref);
      doc.empty ? setGoods(null) : setGoods(doc.docs.map((doc) => doc.data()));
    })();
  }, [selectedCategory]);
  const setToCart = (item, userId) => {
    userId
      ? set({
        ...item,
        userId,
      })
      : window.confirm("авторизуйтесь обо зарегеструйтесь будь ласка") &&
        navigate(REGISTRATION_ROUTE);
  };
  const set = (obj) =>{
    dispatch(
      addCartGoods(obj)
    )
    window.confirm("товар перенесено до корзини. Бажаєте перейти ?") &&
    navigate(CART_ROUTE);
  }
  const writeFavorites = (item) => {
    dispatch(addFavorite({ item, userId: userData.id }));
  };
  const removeFavoritItem = (id) => {
    dispatch(removeFavorite({ id, userId: userData.id }));
  };
  const favoriteId = favoritesData.items.map((e) => e.id);
  return (
    <div className={styles.main}>
      {value && (
        <div className={styles.searchInfo}>
          <p>
            товари що були знайдені по запиту{" "}
            <span className={styles.value}>{value}</span>
          </p>
        </div>
      )}
      <div className={styles.container}>
        {goods ? (
          goods.length > 0 ? (
            goods
              .filter((e) => {
                return e.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
              })
              .map((item) => {
                return (
                  <div key={item.id} className={styles.item}>
                    <img
                      className={styles.img}
                      src={item.img}
                      alt={item.name}
                    />
                    <div className={styles.text}>
                      <p className={styles.name}>{item.name}</p>
                      <p className={styles.price}>
                        {item.price.toLocaleString()}
                        <span className={styles.currency}>₴</span>
                      </p>
                    </div>
                    <div className={styles.actions}>
                      <button
                        onClick={() => setToCart(item, userData.id)}
                        className={styles.btn}
                      >
                        купити
                      </button>
                      <div
                        onClick={() => {
                          userData.isAuth
                            ? favoriteId.includes(item.id)
                              ? removeFavoritItem(item.id)
                              : writeFavorites(item)
                            : window.confirm(
                                "авторизуйтесь обо зарегеструйтесь будь ласка"
                              ) && navigate(REGISTRATION_ROUTE);
                        }}
                        className={styles.heart}
                      >
                        <Heart active={favoriteId.includes(item.id)} />
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className={styles.loading}>loading...</div>
          )
        ) : (
          <EmptyContext header={"данних товарів на данний момент не має"} />
        )}
      </div>
    </div>
  );
}

export default Main;
