import React from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import logo from "../../../image/logo (1).png";
const Menu = () => {
  return (
    <div className={styles.headerLayout}>
      <header>
        <div className={styles.containerMenu}>
          <div className={styles.headLayout}>
            <img
            alt=""
              src={logo}
              style={{
                width: "100px",
                height: "55px",
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
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Menu;
