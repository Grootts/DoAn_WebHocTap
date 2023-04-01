import styles from "./AdminHome.module.css";
import HeaderAdmin from "./header/HeaderAdmin";
import MenuAdmin from "./menuAdmin/MenuAdmin";

const AdminHome = () => {
  return (
    <div className={styles.adminHomeStyles}>
      <MenuAdmin />
      <HeaderAdmin />
    </div>
  );
};
export default AdminHome;
