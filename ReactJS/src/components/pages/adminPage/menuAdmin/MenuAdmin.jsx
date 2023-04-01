import { Link } from "react-router-dom";
import styles from "./MenuAdmin.module.css";
const MenuAdmin = () => {
  return (
    <div className={styles.menuAdminStyles}>
      <div className={styles.menuLogo}>
        <img src="./logo.png" />
      </div>
      <ul className={styles.menuItem}>
        <li>
          <Link to="#">Trang chủ</Link>
        </li>
        <li>
          <Link to="#">Quản lý học sinh</Link>
        </li>
        <li>
          <Link to="#">Quản lý giáo viên</Link>
        </li>
        <li>
          <Link to="#">Quản lý lớp học</Link>
        </li>
        <li>
          <Link to="#">Thống kê</Link>
        </li>
      </ul>
    </div>
  );
};
export default MenuAdmin;
