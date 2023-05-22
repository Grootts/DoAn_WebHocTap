import { IoMdArrowDropdown } from "react-icons/io";
import axios from "../../../services/axiosInterceptor";
import avatar from "../../../image/avatar.png";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./AccountInfor.module.css";
import Modal from "antd/es/modal/Modal";
import { useEffect, useState } from "react";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../../hook/useMutationHook";
import * as UserServices from "../../../services/UserServices";
import * as OrderServices from "../../../services/OrderServices";
const AccountInfo = () => {
  const navigate = useNavigate();
  var arr = [];
  const order = useSelector((state) => state.order);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCourse, setIsModalOpenCourse] = useState(false);
  const [loadCourse, setLoadCourse] = useState(false);
  const user = useSelector((state) => state.user);
  const [dataUser, setDataUser] = useState();
  const [coursesCard, setDataCourse] = useState([]);
  const [stateProductDetail, setStateProductDetail] = useState({
    name: "",
    email: "",
    password: "",
  });
  const mutation = useMutationHooks((data) => UserServices.getDetailUser(data));
  const mutationCourse = useMutationHooks((data) =>
    OrderServices.getAllOrder()
  );
  const [showEdit, setShowEdit] = useState(true);
  const { data, isSuccess } = mutation;
  const { data: courseData, isSuccess: courseisSuccess } = mutationCourse;
  useEffect(() => {
    mutation.mutate(user?.id);
    mutationCourse.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (courseisSuccess) {
      const dataAllStudent = courseData?.data
        ?.filter((data) => data?.userId === user?.id)
        .map((data1) => data1?.orderItems);
      if (dataAllStudent !== undefined) {
        for (var i = 0; i < dataAllStudent?.length; i++) {
          arr.push(...dataAllStudent[i]?.map((data) => data));
          setDataCourse(arr);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseisSuccess, loadCourse]);
  useEffect(() => {
    if (isSuccess) {
      const dataUser = data?.data;
      setDataUser(dataUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  // useEffect(() => {
  //   if (user) {
  //     mutation.mutate(user?.id);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isSuccess) {
  //     const dataAllStudent = data?.data.courseFollow;
  //     setDataCourse(dataAllStudent.map((data) => data?.courseId));
  //     if (coursesCard !== undefined) {
  //       for (var i = 0; i < coursesCard?.length; i++) {
  //         setDataCourse2(coursesCard[i]);
  //       }
  //     }
  //   }
  // }, [isSuccess]);
  // useEffect(() => {
  //   if (courseisSuccess) {
  //     const dataAllCoirse = data?.data;

  //   }
  // }, [courseisSuccess]);

  // useEffect(() => {
  //   if (coursesCard2) {
  //     mutationCourse.mutate(coursesCard2);
  //   }
  // }, [coursesCard2]);
  // console.log(coursesCard2);
  // console.log(coursesCard);
  const handleOnchangeDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      [e.target.name]: e.target.value,
    });
    console.log(stateProductDetail);
  };
  const handleEdit = async (id) => {
    setShowEdit(false);
    try {
      const response = await axios.get(`api/user/get-details/${id}`);
      setStateProductDetail(response.data.data);
      console.log(stateProductDetail);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const handleSubmitUpdate = async (id) => {
    console.log(id);

    try {
      const response = await axios.put(
        `api/user/update-user/${id}`,
        stateProductDetail
      );

      if (response.status === 200) {
        alert("cập nhật thành công");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  // const handleShowNotification = () => {
  //   setShowNotify(!showNotify);
  // };
  const handleOpenInfo = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpenInfoCourse = () => {
    setIsModalOpenCourse(true);
    setLoadCourse(!loadCourse);
  };
  const handleCancelCourse = () => {
    setIsModalOpenCourse(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleShowOrder = () => {
    navigate("/order");
  };
  const handleClickCourse = (id) => {
    navigate(`/courseDetail/${id}`);
  };
  console.log(coursesCard);
  return (
    <div className={styles.headerStyles}>
      {/* <Badge count={5}>
        <IoMdNotifications size={25} onClick={handleShowNotification} />
      </Badge>
      {showNotify && (
        <div className={styles.notifyPanel}>
          <div className={styles.headNotify}> Thông báo mới</div>
          <div className={styles.bodyNotify}></div>
        </div>
      )} */}
      <Badge count={order?.orderItems?.length}>
        {user?.isRole === "admin" || user?.isRole === "teacher" ? (
          ""
        ) : (
          <FaShoppingCart size={25} onClick={handleShowOrder} />
        )}
      </Badge>
      <div className={styles.infoContainer}>
        <div className={styles.accountInfo}>
          <img alt="" src={avatar} />
          <div>{dataUser?.name}</div>
          <IoMdArrowDropdown />
        </div>

        <Modal
          title="Thông tin cá nhân"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <form>
            <div className={styles.showInfoPanel}>
              <div>
                <img alt="" className={styles.img} src={avatar} />
              </div>
              <div></div>
              {showEdit ? (
                <div>
                  <div className={styles.showInfoText}>
                    <p>Tên:</p>
                    <p>{dataUser?.name}</p>
                  </div>
                  <div className={styles.showInfoText}>
                    <p>Email:</p>
                    <p>{dataUser?.email}</p>
                  </div>
                  {/* {user?.isRole === "teacher" && (
                    <div className={styles.showInfoText}>
                      <p>Lời giới thiệu:</p>
                      <p>{user?.email}</p>
                    </div>
                  )} */}
                  <div
                    className={styles.button}
                    onClick={() => handleEdit(user?.id)}
                  >
                    Chỉnh sửa thông tin cá nhân
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles.inputAdd}>
                    <p>Tên của bạn:</p>
                    <input
                      placeholder="Enter Your Name"
                      type="text"
                      name="name"
                      value={stateProductDetail.name}
                      onChange={handleOnchangeDetail}
                      required
                    />
                  </div>
                  <div className={styles.inputAdd}>
                    <p>Địa chỉ email:</p>
                    <p>{stateProductDetail.email}</p>
                  </div>
                  <div className={styles.inputAdd}>
                    <p>Mật khẩu:</p>
                    <input
                      placeholder="Enter Password"
                      type="password"
                      name="password"
                      value={stateProductDetail.password}
                      onChange={handleOnchangeDetail}
                    />
                  </div>
                  <div>
                    <div
                      style={{ marginTop: "7px" }}
                      className={styles.button}
                      onClick={() => handleSubmitUpdate(stateProductDetail._id)}
                    >
                      Cập nhật
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </Modal>
        <Modal
          title="Các khóa học đã đăng ký"
          open={isModalOpenCourse}
          onOk={handleCancelCourse}
          onCancel={handleCancelCourse}
        >
          <form>
            <div className={styles.showInfoPanel}>
              <div>
                {coursesCard &&
                  coursesCard?.map((data1) => {
                    return (
                      <div
                        className={styles.coursePanel}
                        key={data1.course}
                        onClick={() => handleClickCourse(data1.course)}
                      >
                        <img alt="" src={data1.image} />
                        <div>
                          <p>{data1.name}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </form>
        </Modal>
        <div className={styles.infoPanel}>
          <div className={styles.infoText}>
            <div className={styles.infoTextTitle} onClick={handleOpenInfo}>
              Thông tin cá nhân
            </div>
            {user?.isRole === "student" && (
              <div
                className={styles.infoTextTitle}
                onClick={handleOpenInfoCourse}
              >
                Danh sách lớp học{" "}
              </div>
            )}
            <div className={styles.infoTextLogout} onClick={handleLogout}>
              Đăng xuất
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountInfo;
