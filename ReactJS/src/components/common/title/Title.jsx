import React from "react";
import styles from "./Title.module.css";
const Title = ({ subtitle, title }) => {
  return (
    <div className={styles.titleHomeStyle}>
      <div className={styles.titleStyle}>
        <h2>{subtitle} </h2>
        <h1>{title} </h1>
      </div>
    </div>
  );
};

export default Title;
