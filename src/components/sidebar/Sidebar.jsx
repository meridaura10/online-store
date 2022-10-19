import React from "react";
import styles from "./Sidebar.module.scss";
import { TYPES_OF_GOODS } from "../../constants/typesOfGoods";
import { writeDatabase } from "../../firebase";
import { useDispatch } from "react-redux";
import { setCategory } from "../../store/Slices/categorySlice";
import {useSelectedCategory} from '../../hooks/use-selectedCategory'
function Sidebar() {
  const dispatch = useDispatch()
  const selectedCategory = useSelectedCategory()
  const write = () =>{
      writeDatabase({
      name: 'Чоловічі черевики з Gore-Tex Salomon Predict Hike Mid Gore-Tex L41613500 46.5 (12US) 30 см Сірі (193128936389)',
      img: 'https://content.rozetka.com.ua/goods/images/big/288037539.jpg',
      price: 8299,
      category: 'clothes'
      })
  }
  const setSelectedCategory = (category) =>{
    dispatch(setCategory({
      selectedCategory: category
    }))
  }
  return (
    <aside className={styles.aside}>
      <ul className={styles.list}>
        {TYPES_OF_GOODS.map((item) => (
           <li onClick={() => setSelectedCategory(item.key)} key={item.key} className={styles.item}>
            <div className={styles.img}>{item.img}</div>
            <p className={`${styles.text} ${selectedCategory === item.key  ? styles.active : ''}`}>{item.name}</p>
          </li>
        ))}
      </ul>
      {/* <button onClick={write}>додати товар</button> */}
    </aside>
  );
}

export default Sidebar;
