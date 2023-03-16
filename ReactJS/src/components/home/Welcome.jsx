import React from "react";
import About from "../about/About";
import styles from "./Home.module.css";
const Welcome = () => {
  return (
    <>
      <div className={styles.homeTitle}>
        <div className={styles.titleStyle}>
          <h2>Chào mừng đến với </h2>
          <h1>Website học tập B&Đ </h1>
          <div className={styles.buttonStyle}>
            <button>
              Bắt đầu ngay <i className="fa fa-long-arrow-alt-right"></i>
            </button>
            <button>
              Xem khóa học <i className="fa fa-long-arrow-alt-right"></i>
            </button>
          </div>
        </div>
      </div>

      <About />
    </>
  );
};

export default Welcome;
