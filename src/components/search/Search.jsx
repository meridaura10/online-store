import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Search.module.scss";
import {setValueSearch} from '../../store/Slices/searchSlice'
function Search() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(setValueSearch(value))
  },[value,dispatch])
  return (
    <>
      <div className={styles.SearchtWrap}>
        <input
          value={value}
          placeholder="я шукаю..."
          className={`${styles.input}`}
          type="text"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </>
  );
}

export default Search;
