import React from "react";
import styles from "./EmptyContent.module.scss";
import EmptyCart from "../../img/EmptyCart";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../constants/route";
function EmptyContent({ rout, header, text, btn }) {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyWrap}>
        <div className={styles.emptyTextWrap}>
          {header ? <p className={styles.emptyTextHeader}>{header}</p> : ""}
          {text ? <p className={styles.emptyText}>{text}</p> : ""}
        </div>
        <div className={styles.emptyImgWrap}>
          <EmptyCart />
        </div>
        {btn ? (
          <div className={styles.emptyWrapBtn}>
            <Link to={rout ? rout : HOME_ROUTE}>
              <button className={styles.emptyBtn}>повернутись назад</button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default EmptyContent;
