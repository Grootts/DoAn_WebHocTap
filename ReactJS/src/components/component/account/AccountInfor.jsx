import { IoMdArrowDropdown } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AccountInfor.module.css";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
const AccountInfo = () => {
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dataLocal = localStorage.getItem("name", 1);
  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };
  const handleOpenInfo = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleShowOrder = () => {
    navigate("/order");
  };
  return (
    <div className={styles.headerStyles}>
      <Badge count={order?.orderItems?.length}>
        <FaShoppingCart size={25} onClick={handleShowOrder} />
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
        <div className={styles.infoPanel}>
          <div className={styles.infoText}>
            <div className={styles.infoTextTitle} onClick={handleOpenInfo}>
              Thông tin người dùng
            </div>
            <div className={styles.infoTextTitle}>Danh sách lớp học </div>
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
