import { Link } from "react-router-dom";
import styles from "./MenuAdmin.module.css";
import { useSelector } from "react-redux";
const MenuAdmin = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className={styles.menuAdminStyles}>
      <div className={styles.menuLogo}>
        <img src="./logo.png" />
      </div>
      <ul className={styles.menuItem}>
        <li>
          <Link to="/admin">Trang chủ</Link>
        </li>
        {user?.isRole === "admin" && (
          <li>
            <Link to="manage-student">Quản lý học sinh</Link>
          </li>
        )}
        {user?.isRole === "admin" && (
          <li>
            <Link to="manage-teacher">Quản lý giáo viên</Link>
          </li>
        )}
        <li>
          <Link to="manage-course">Quản lý lớp học</Link>
        </li>
        {user?.isRole === "admin" && (
          <li>
            <Link to="manage-statistical">Thống kê</Link>
          </li>
        )}
      </ul>
    </div>
  );
};
export default MenuAdmin;
