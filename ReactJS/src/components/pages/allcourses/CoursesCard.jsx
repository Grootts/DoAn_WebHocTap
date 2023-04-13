import React, { useEffect, useState } from "react";
import styles from "./Courses.module.css";
import { useNavigate } from "react-router-dom";
import axios from "../../../services/axiosInterceptor";
const CoursesCard = () => {
  const navigate = useNavigate();
  const [coursesCard, setDataCourse] = useState([]);
  const dataC = async () => {
    const response = await axios.get("api/course/get-all");

    if (response.data !== undefined) {
      setDataCourse(response.data.data);
      return console.log(response.data.data);
    }
  };
  const handleCourseDetail = (_id) => {
    navigate(`/courseDetail/${_id}`);
  };

  return (
    <>
      <div className={styles.coursesCardStyles}>
        {dataC() &&
          coursesCard.map((couser) => {
            return (
              <div className={styles.coursesCard}>
                <div key={couser._id}>
                  <img className={styles.image} src={couser.image} alt="" />
                  <div className={styles.button}>
                    <button onClick={() => handleCourseDetail(couser._id)}>
                      Xem thông tin lớp
                    </button>
                  </div>
                </div>
                <div className={styles.coursesCardText}>
                  <h3>{couser.name}</h3>
                  <h4>{couser.price} </h4>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CoursesCard;
