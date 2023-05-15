import { Collapse, Drawer } from "antd";
import styles from "./Lesson.module.css";
import axios from "../../../../services/axiosInterceptor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutationHooks } from "../../../../hook/useMutationHook";
import * as LessonServices from "../../../../services/LessonServices";
import { FaPencilAlt } from "react-icons/fa";
import ManageLesson from "../../adminPage/manage/manageLesson/ManageLesson";
import { useSelector } from "react-redux";
const { Panel } = Collapse;
const Lesson = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [stateLessonDetail, setstateLessonDetail] = useState({
    nameLesson: "",
    description: "",
  });
  const [idLesson, setIdLesson] = useState("");
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
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
      const dataAllLesson = data?.data?.lesson ?? [];
      setDataCourse(dataAllLesson);
    }
  }, [isSuccess]);
  const handleUpdate = (id) => {
    setIdLesson(id);
    setOpen(true);
  };
  const onChange = (key) => {
    console.log(key);
  };
  const handleOnchangeDetail = (e) => {
    setstateLessonDetail({
      ...stateLessonDetail,
      [e.target.name]: e.target.value,
    });
    console.log(stateLessonDetail);
  };

  const handleSubmitUpdate = async (id) => {
    console.log(id);

    try {
      const response = await axios.put(
        `api/lesson/update/${id}`,
        stateLessonDetail
      );

      if (response.status === 200) {
        alert("cập nhật thành công");
        window.location.reload();
        return setOpen(false);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className={styles.lessonStyles}>
      {coursesCard.map((data, index) => {
        return (
          <div>
            {open && (
              <Drawer
                title="Update"
                placement="right"
                onClose={onClose}
                open={open}
                closable={false}
                size="large"
              >
                <form>
                  <div className={styles.inputAdd}>
                    <p>Tên bài học:</p>
                    <input
                      type="text"
                      name="nameLesson"
                      value={stateLessonDetail?.nameLesson}
                      onChange={handleOnchangeDetail}
                    />
                  </div>
                  <div className={styles.inputAdd}>
                    <p>Giới thiệu:</p>
                    <textarea
                      type=""
                      name="description"
                      value={stateLessonDetail?.description}
                      onChange={handleOnchangeDetail}
                    />
                  </div>
                  <div>
                    <div
                      className={styles.addCourse}
                      onClick={() => handleSubmitUpdate(idLesson)}
                    >
                      Cập nhật
                    </div>
                  </div>
                </form>
              </Drawer>
            )}
            <Collapse defaultActiveKey={["1"]} onChange={onChange}>
              <Panel header={data.nameLesson} key={data._id}>
                {(user?.isRole === "admin" || user?.isRole === "teacher") && (
                  <div
                    className={styles.updateCourse}
                    onClick={() => handleUpdate(data._id)}
                  >
                    {" "}
                    <FaPencilAlt />
                  </div>
                )}

                <p>{data.description}</p>
              </Panel>
            </Collapse>
          </div>
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
