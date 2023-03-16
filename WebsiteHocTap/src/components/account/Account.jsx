import React from "react";
import styles from "./Account.module.css";
import { FiUser, FiKey } from "react-icons/fi";
import { Link } from "react-router-dom";
function Account() {
  return (
    <div>
      <div className={styles.accountLayout}>
        <button className={styles.buttonAccount}>
          <Link to="/login">
            <FiKey />
            Đăng nhập
          </Link>
        </button>
        <button className={styles.buttonAccount}>
          <Link to="/register">
            <FiUser />
            Đăng ký
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Account;
