import React from "react";
import { useNavigate } from "react-router-dom";
import AboutCard from "../about/AboutCard";
import styles from "./Home.module.css";
const Welcome = () => {
  const dataLocal = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/login");
  };
  const handleShowCourse = () => {
    navigate("/courses");
  };

  return (
    <>
      <div className={styles.homeTitle}>
        <div className={styles.titleStyle}>
          <h2>Chào mừng đến với </h2>
          <h1>Website học tập B&Đ </h1>
          {dataLocal ? (
            ""
          ) : (
            <div className={styles.buttonStyle}>
              <button onClick={handleStart}>
                Bắt đầu ngay <i className="fa fa-long-arrow-alt-right"></i>
              </button>
              <button onClick={handleShowCourse}>
                Xem khóa học <i className="fa fa-long-arrow-alt-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>

      <AboutCard />
    </>
  );
};

export default Welcome;
