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
import { convertPrice } from "../../../utils";
import Loading from "../../component/loading/Loading";

const Introduce = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const idUser = user?.id;
  const [show, setShow] = useState("true");
  const [register, setRegister] = useState(false);
  const [coursesCard, setDataCourse] = useState([]);
  const mutation = useMutationHooks((data) =>
    CourseServices.getDetailsCourse(data)
  );

  const { data, isLoading, isSuccess } = mutation;
  useEffect(() => {
    mutationCourse.mutate();
    mutation.mutate(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (coursesIsSuccess && idUser) {
      const dataOrderByUser = coursesData?.data?.filter((element) =>
        element.userId?.includes(idUser)
      );

      if (dataOrderByUser && idUser) {
        const soSanh = dataOrderByUser
          ?.map((courses) =>
            courses.orderItems?.map((nameOrder) => nameOrder.course)
          )
          ?.filter((element) => element.includes(id))
          ?.some((element) => element.includes(id));
        console.log(idUser);
        console.log(soSanh);
        if (soSanh) {
          setShow("false");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursesIsSuccess]);
  console.log(coursesCard);
  useEffect(() => {
    if (isSuccess) {
      setDataCourse(data?.data);

      const checkFollow = data?.data?.userFollow?.filter(
        (element) => element?.userId === user?.id
      );
      if (checkFollow.length !== 0 && checkFollow !== "" && user?.id !== "") {
        setRegister(true);
        console.log(checkFollow);
      }
      console.log(checkFollow);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleAddOrderProduct = () => {
    if (user?.id === "") {
      alert("Bạn phải đăng nhập");
    } else {
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
    }
  };

  const handleRegisterCourse = async () => {
    const res = await axios.put(`api/course/update-follow/${id}`, {
      userId: user?.id,
      userName: user?.name,
    });
    if (res.status === 200) {
      setRegister(true);
      setShow(1);
    } else {
      alert("Chưa theo dõi thành công");
    }
  };
  if (isLoading || coursesIsLoading) {
    return <Loading isLoading={isLoading || coursesIsLoading}></Loading>;
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
              {show === "true" && register === false && (
                <button onClick={handleAddOrderProduct}>
                  {convertPrice(coursesCard?.price)}
                </button>
              )}{" "}
              {/* {show === "false" && (
                <button onClick={handleFollow}>Theo dõi khóa học</button>
              )}
              {show === "follow" && <p>Đã theo dõi</p>} */}
              {show === "false" && register === false && (
                <button onClick={handleRegisterCourse}>Đăng ký khóa học</button>
              )}
              {register && <p>Đã đăng ký</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Introduce;
