import React from "react";
import styles from './ErrorCart.module.scss'

function ErrorCart({ error }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.header}>вибачте відбулася помилка</p>
      <p className={styles.text}>{error}</p>
    </div>
  );
}

export default ErrorCart;
