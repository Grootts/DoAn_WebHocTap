import React from "react";
import Account from "../../component/account/Account";
import AccountInfo from "../../component/account/AccountInfor";
import Search from "../../component/search/Search";

import styles from "./Head.module.css";
import Menu from "./Menu";
const Head = () => {
  const data = localStorage.getItem("token");
  return (
    <div className={styles.headerLayout}>
      <Menu />

      {data ? <AccountInfo /> : <Account />}
    </div>
  );
};

export default Head;
