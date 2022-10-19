import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import Heart from "../../img/Heart";
import { addCartGoods } from "../../store/Slices/cartsSlice";
import { useSelectedCategory } from "../../hooks/use-selectedCategory";
import styles from "./Main.module.scss";
import { writeToFirebaseDatabaseCart } from "../../firebase/cart";
import { useUserData } from "../../hooks/use-user";
import { useNavigate } from "react-router-dom";
import { REGISTRATION_ROUTE } from "../../constants/route";
import EmptyCart from "../../img/EmptyCart";
function Main() {
  const [goods, setGoods] = useState([]);
  const userData = useUserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCategory = useSelectedCategory();
  useEffect(() => {
    (async () => {
      const goodsColectonRef = collection(db, "goods");
      const ref =
        selectedCategory == "all"
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
      ? dispatch(
          addCartGoods({
            ...item,
            userId,
          })
        )
      : window.confirm("авторизуйтесь обо зарегеструйтесь будь ласка") &&
        navigate(REGISTRATION_ROUTE);
  };
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {goods ? (
          goods.length > 0 ? (
            goods.map((item) => {
              return (
                <div key={item.id} className={styles.item}>
                  <img className={styles.img} src={item.img} alt="pc" />
                  <div className={styles.text}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.price}>
                      {item.price}
                      <span className={styles.currency}>$</span>
                    </p>
                  </div>
                  <div className={styles.actions}>
                    <button
                      onClick={() => setToCart(item, userData.id)}
                      className={styles.btn}
                    >
                      купити
                    </button>
                    <div className={styles.heart}>
                      <Heart active={false} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.loading}>loading...</div>
          )
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyText}>данних товарів на данний момент не має </div>
            <div className={styles.emptyImgWrap}>
              <EmptyCart />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
