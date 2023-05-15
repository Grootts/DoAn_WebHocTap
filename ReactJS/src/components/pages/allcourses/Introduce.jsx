import { useParams } from "react-router-dom";
import TeacherPanel from "../../component/teacherPanel/TeacherPanel";
import styles from "./Introduce.module.css";
import * as CourseServices from "../../../services/CourseServices";
import * as OrderServices from "../../../services/OrderServices";
import { useMutationHooks } from "../../../hook/useMutationHook";
import axios from "../../../services/axiosInterceptor";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderProduct } from "../../../redux/slide/orderSlide";
import React from "react";
import MenuDetail from "./MenuDetail";
import { convertPrice } from "../../../utils";
const Introduce = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token", 1);
  const user = useSelector((state) => state.user);
  const idUser = user?.id;
  const [show, setShow] = useState("true");
  const [coursesCard, setDataCourse] = useState([]);
  const mutation = useMutationHooks((data) =>
    CourseServices.getDetailsCourse(data)
  );

  const { data, isLoading, isSuccess } = mutation;
  useEffect(() => {
    mutation.mutate(id);
    mutationCourse.mutate();
  }, []);

  const mutationCourse = useMutationHooks((data) =>
    OrderServices.getAllOrder()
  );
  const {
    data: coursesData,
    isLoading: coursesIsLoading,
    isSuccess: coursesIsSuccess,
  } = mutationCourse;

  useEffect(() => {
    if (coursesIsSuccess) {
      const dataOrderByUser = coursesData?.data?.filter((element) =>
        element.userId?.includes(idUser)
      );
      console.log(data?.data);
      const soSanh = dataOrderByUser
        ?.map((courses) =>
          courses.orderItems?.map((nameOrder) => nameOrder.course)
        )
        ?.filter((element) => element.includes(id))
        ?.some((element) => element.includes(id));

      console.log(soSanh);
      if (soSanh) {
        setShow("false");
        <MenuDetail show1={false} />;
      }
    }
    if (token === null) {
      setShow("true");
      <MenuDetail show1={true} />;
    }
  }, [coursesIsSuccess]);
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      const checkFollow = data?.data?.userFollow?.filter(
        (element) => element?.userId === user?.id
      );

      setDataCourse(data?.data);
      if (checkFollow !== "") {
        setShow("follow");
      }
    }
  }, [isSuccess]);
  if (isSuccess && data?.status === "OK") {
    const checkFollow = data?.data?.userFollow?.filter(
      (element) => element?.userId === user?.id
    );
    if (show === "false" && checkFollow !== "") {
      setShow("follow");
    }
    console.log(checkFollow);
  }

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
  const handleFollow = async () => {
    const res = await axios.put(`api/course/update-follow/${id}`, {
      userId: user?.id,
      userName: user?.name,
    });
    if (res.status === 200) {
      setShow("follow");
    } else {
      alert("Chưa theo dõi thành công");
    }
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
              {show === "true" && (
                <button onClick={handleAddOrderProduct}>
                  {convertPrice(coursesCard?.price)}
                </button>
              )}{" "}
              {show === "false" && (
                <button onClick={handleFollow}>Theo dõi khóa học</button>
              )}
              {show === "follow" && <p>Đã theo dõi</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Introduce;
