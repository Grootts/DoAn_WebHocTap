import { Outlet } from "react-router-dom";
import Title from "../../common/title/Title";

import styles from "./CourseDetail.module.css";
import MenuDetail from "./MenuDetail";
const CourseDetail = () => {
  return (
    <div>
      <div className={styles.detailLayout}>
        <Title title="CourseTitle" />
        <MenuDetail />
        <Outlet />
      </div>
    </div>
  );
};
export default CourseDetail;
