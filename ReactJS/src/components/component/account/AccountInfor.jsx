import {
  IoMdArrowDropdown,
  IoMdNotifications,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AccountInfor.module.css";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CourseRegisterPanel from "../courseRegisterPanel/CourseRegisterPanel";
const AccountInfo = () => {
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCourse, setIsModalOpenCourse] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const dataLocal = localStorage.getItem("name", 1);
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };
  const handleShowNotification = () => {
    setShowNotify(!showNotify);
  };
  const handleOpenInfo = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpenInfoCourse = () => {
    setIsModalOpenCourse(true);
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
  return (
    <div className={styles.headerStyles}>
      <Badge count={5}>
        <IoMdNotifications size={25} onClick={handleShowNotification} />
      </Badge>
      {showNotify && (
        <div className={styles.notifyPanel}>
          <div className={styles.headNotify}> Thông báo mới</div>
          <div className={styles.bodyNotify}></div>
        </div>
      )}
      <Badge count={order?.orderItems?.length}>
        {user?.isRole === "admin" || user?.isRole === "teacher" ? (
          ""
        ) : (
          <FaShoppingCart size={25} onClick={handleShowOrder} />
        )}
      </Badge>
      <div className={styles.infoContainer}>
        <div className={styles.accountInfo}>
          <img />
          <div>{dataLocal}</div>
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
                <img className={styles.img} />
                <div className={styles.button}>Đổi ảnh đại diện</div>
              </div>
              <div>
                <div className={styles.showInfoText}>
                  <p>Tên:</p>
                  <p>{dataLocal}</p>
                </div>
                <div className={styles.showInfoText}>
                  <p>Email:</p>
                  <p>student@gmail.com</p>
                </div>
              </div>
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
              <CourseRegisterPanel />
            </div>
          </form>
        </Modal>
        <div className={styles.infoPanel}>
          <div className={styles.infoText}>
            <div className={styles.infoTextTitle} onClick={handleOpenInfo}>
              Thông tin cá nhân
            </div>
            <div
              className={styles.infoTextTitle}
              onClick={handleOpenInfoCourse}
            >
              Danh sách lớp học{" "}
            </div>
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
