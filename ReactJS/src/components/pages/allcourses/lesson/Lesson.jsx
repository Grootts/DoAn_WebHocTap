import { Collapse } from "antd";
import styles from "./Lesson.module.css";
import axios from "../../../../services/axiosInterceptor";
import { useParams } from "react-router-dom";
import { useState } from "react";
const { Panel } = Collapse;
const Lesson = () => {
  const { id } = useParams();
  const [coursesCard, setDataCourse] = useState([]);
  const dataLesson = async () => {
    const response = await axios.get(`api/lesson/get-details/${id}`);

    if (response.data !== undefined) {
      const data = response.data.data;
      setDataCourse(data.lesson);
      return console.log(coursesCard);
    }
  };
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div className={styles.lessonStyles}>
      {dataLesson() &&
        coursesCard.map((data, index) => {
          return (
            <Collapse defaultActiveKey={["1"]} onChange={onChange}>
              <Panel header={data.nameLesson} key={index}>
                <p>{data.description}</p>
              </Panel>
            </Collapse>
          );
        })}
    </div>
    // <div className={styles.lessonStyles}>
    //   <div className={styles.tableStyles}>
    //     <table>
    //       <thead className={styles.courseTitle}>
    //         <tr>
    //           <th>Bài số</th>
    //           <th>Tên bài</th>
    //         </tr>
    //       </thead>
    //       <tbody className={styles.courseBody}>
    //         <tr>
    //           <td>1</td>
    //           <td>Bài 1</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};
export default Lesson;
