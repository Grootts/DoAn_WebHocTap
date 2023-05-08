import { Collapse } from "antd";
import styles from "./Lesson.module.css";
import axios from "../../../../services/axiosInterceptor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutationHooks } from "../../../../hook/useMutationHook";
import * as LessonServices from "../../../../services/LessonServices";
const { Panel } = Collapse;
const Lesson = () => {
  const { id } = useParams();
  const [coursesCard, setDataCourse] = useState([]);
  const mutation = useMutationHooks((data) =>
    LessonServices.getDetailsLesson(id)
  );
  const { data, isSuccess, isLoading } = mutation;
  useEffect(() => {
    mutation.mutate({ id: id });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const dataAllLesson = data?.data.lesson ?? [];
      setDataCourse(dataAllLesson);
    }
  }, [isSuccess]);

  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div className={styles.lessonStyles}>
      {coursesCard.map((data, index) => {
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
