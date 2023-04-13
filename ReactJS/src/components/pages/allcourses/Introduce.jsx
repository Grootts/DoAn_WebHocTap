import { useParams } from "react-router-dom";
import TeacherPanel from "../../component/teacherPanel/TeacherPanel";
import styles from "./Introduce.module.css";

import axios from "../../../services/axiosInterceptor";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrderProduct } from "../../../redux/slide/orderSlide";
const Introduce = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [coursesCard, setDataCourse] = useState([]);
  const dataOneCourse = async () => {
    const response = await axios.get(`api/course/get-details/${id}`);

    if (response.data !== undefined) {
      const data = response.data.data;
      setDataCourse(data);
      return console.log(coursesCard);
    }
  };
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

  return (
    <div className={styles.introduceStyles}>
      {dataOneCourse() && (
        <div>
          {
            <div>
              <h2>Mô tả khóa học</h2>
              <p>{coursesCard.description}</p>
            </div>
          }
          <h2>Giới thiệu giáo viên</h2>

          {coursesCard.createdBy && <TeacherPanel id={coursesCard.createdBy} />}
          <div className={styles.introduceButton}>
            <p style={{ textAlign: "center", margin: "20px" }}>
              {coursesCard.price}đ
            </p>
            <div
              style={{
                marginBottom: "10px",
                gap: "30px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <button onClick={handleAddOrderProduct}>Mua ngay</button>
              <button>Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Introduce;
