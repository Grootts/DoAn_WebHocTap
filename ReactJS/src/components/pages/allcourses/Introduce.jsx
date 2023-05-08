import { useParams } from "react-router-dom";
import TeacherPanel from "../../component/teacherPanel/TeacherPanel";
import styles from "./Introduce.module.css";
import * as CourseServices from "../../../services/CourseServices";
import { useMutationHooks } from "../../../hook/useMutationHook";
import axios from "../../../services/axiosInterceptor";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addOrderProduct } from "../../../redux/slide/orderSlide";
import React from "react";
import MenuDetail from "./MenuDetail";
import { convertPrice } from "../../../utils";
const Introduce = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [coursesCard, setDataCourse] = useState([]);
  const mutation = useMutationHooks((data) =>
    CourseServices.getDetailsCourse(data)
  );

  const { data, isLoading, isSuccess } = mutation;
  useEffect(() => {
    mutation.mutate(id);
  }, []);
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      setDataCourse(data?.data);
      <MenuDetail dataCourse={coursesCard?.name} />;
    }
  }, [isSuccess]);
  console.log(coursesCard);
  const handleAddOrderProduct = () => {
    dispatch(
      addOrderProduct({
        orderItem: {
          name: coursesCard?.name,
          image: coursesCard?.image,
          price: coursesCard?.price,
          course: coursesCard?._id,
        },
      })
    );
  };
  if (isLoading) {
    return <React.Fragment></React.Fragment>;
  }
  return (
    <div className={styles.introduceStyles}>
      {isSuccess && (
        <div>
          <div>
            <h2>Mô tả khóa học</h2>
            <p>{coursesCard?.description}</p>
          </div>

          <h2>Giới thiệu giáo viên</h2>

          {coursesCard?.createdBy && (
            <TeacherPanel id={coursesCard?.createdBy} />
          )}

          <div className={styles.introduceButton}>
            <p style={{ textAlign: "center", margin: "20px" }}></p>
            <div
              style={{
                marginBottom: "10px",
                gap: "30px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <button onClick={handleAddOrderProduct}>
                {convertPrice(coursesCard?.price)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Introduce;
