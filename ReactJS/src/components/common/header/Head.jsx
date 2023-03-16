import React from "react";
import Account from "../../account/Account";
import styles from "./Head.module.css";
import Menu from "./Menu";
const Head = () => {
  return (
    <div className={styles.headerLayout}>
      <Menu />
      <Account />
    </div>
  );
};

export default Head;
