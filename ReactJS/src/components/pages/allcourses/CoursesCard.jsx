import React from "react";
import styles from "./Courses.module.css";
import { coursesCard } from "../../../dummydata";

const CoursesCard = () => {
  return (
    <>
      <div className={styles.coursesCardStyles}>
        {coursesCard.map((couser) => {
          return (
            <div className={styles.coursesCard}>
              <div key={couser.id}>
                <img src={couser.cover} alt="" />
              </div>
              <div className={styles.coursesCardText}>
                <h3>{couser.coursesName}</h3>
                <p>{couser.data}</p>
              </div>
              <div className={styles.button}>
                <button>Xem thông tin lớp</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CoursesCard;
