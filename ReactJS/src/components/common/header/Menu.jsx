import React from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <div className={styles.headerLayout}>
      <header>
        <div className={styles.containerMenu}>
          <div className={styles.headLayout}>
            <img
              src="./logo.png"
              style={{
                width: "100px",
                height: "50px",
                marginLeft: "50px",
              }}
            />
          </div>
          <ul className={styles.itemMenu}>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/courses">Lớp học</Link>
            </li>
            <li>
              <Link to="/about">Thông tin</Link>
            </li>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Menu;
