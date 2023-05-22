import { useNavigate } from "react-router-dom";
import styles from "./CourseRegisterPanel.module.css";
const CourseRegisterPanel = ({ data }) => {
  const navigate = useNavigate();
  const handleClickCourse = (id) => {
    navigate(`/courseDetail/${id}`);
  };
  return (
    <div>
      {data?.map((data1) => {
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
  );
};
export default CourseRegisterPanel;
