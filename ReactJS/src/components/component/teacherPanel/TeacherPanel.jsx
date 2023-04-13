import styles from "./TeacherPanel.module.css";
import axios from "../../../services/axiosInterceptor";
import { useState } from "react";
const TeacherPanel = ({ id }) => {
  const [detailTeacher, setDetailTeacher] = useState([]);
  const dataDetail = async () => {
    const response = await axios.get(`api/user/get-details/${id}`);

    if (response.data !== undefined) {
      setDetailTeacher(response.data.data);
      return console.log(response.data.data);
    }
  };
  return (
    <div className={styles.teacherPanel}>
      {dataDetail() && (
        <div className={styles.teacherDetail} key={detailTeacher.id}>
          <img src="" />
          <div>
            <p>Name:{detailTeacher.name}</p>
            <p></p>
          </div>
        </div>
      )}
    </div>
  );
};
export default TeacherPanel;
