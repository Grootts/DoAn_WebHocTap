import { Outlet } from "react-router-dom";
import StatisticalPanel from "../../component/statisticalPanel/StatisticalPanel";
import styles from "./AdminHome.module.css";
import HeaderAdmin from "./header/HeaderAdmin";
import MenuAdmin from "./menuAdmin/MenuAdmin";
import StatisticalHome from "./statistical/StatisticalHome";

const AdminHome = () => {
  return (
    <div className={styles.adminHomeStyles}>
      <div className={styles.adminLeft}>
        <MenuAdmin />
      </div>
      <div className={styles.adminRight}>
        <HeaderAdmin />
        <div className={styles.homePanel}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminHome;
