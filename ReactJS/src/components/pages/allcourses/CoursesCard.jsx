import React, { useEffect, useState } from "react";
import styles from "./Courses.module.css";
import { useNavigate } from "react-router-dom";
import axios from "../../../services/axiosInterceptor";
import { useMutationHooks } from "../../../hook/useMutationHook";
import * as CourseServices from "../../../services/CourseServices";
import { convertPrice } from "../../../utils";
const CoursesCard = () => {
  const navigate = useNavigate();
  const [coursesCard, setDataCourse] = useState([]);
  useEffect(() => {
    mutation.mutate();
  }, []);
  const mutation = useMutationHooks((data) => CourseServices.getAllCourse());

  const { data, isLoading, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      setDataCourse(data?.data);
    }
    if (isError) {
      alert("error call api");
    }
  }, [isSuccess]);

  console.log(data);
  if (isLoading) {
    return <React.Fragment></React.Fragment>;
  }
  const handleCourseDetail = (_id) => {
    navigate(`/courseDetail/${_id}`);
  };
  return (
    <>
      {/* <p className={styles.textTitle}>Tất cả các lớp học</p> */}
      <div className={styles.coursesCardStyles}>
        {isSuccess &&
          coursesCard?.map((couser) => {
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
                  <h4>{convertPrice(couser.price)} </h4>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CoursesCard;
