import { Collapse, Drawer } from "antd";
import styles from "./Lesson.module.css";
import * as CourseServices from "../../../../services/CourseServices";
import axios from "../../../../services/axiosInterceptor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutationHooks } from "../../../../hook/useMutationHook";
import * as LessonServices from "../../../../services/LessonServices";
import { FaPencilAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Loading from "../../../component/loading/Loading";
const { Panel } = Collapse;
const Lesson = ({ reLoad }) => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [show, setShow] = useState(false);
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
    mutationCourse.mutate(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reLoad]);
  const mutationCourse = useMutationHooks((data) =>
    CourseServices.getDetailsCourse(data)
  );

  const {
    data: dataCourse,
    isLoading: isLoadingCourse,
    isSuccess: isSuccessCourse,
  } = mutationCourse;

  useEffect(() => {
    if (isSuccessCourse) {
      const checkFollow = dataCourse?.data?.userFollow?.filter(
        (element) => element?.userId === user?.id
      );
      if (checkFollow.length !== 0) {
        setShow(true);
        console.log(checkFollow.length);
        console.log(show);
      }
      console.log(checkFollow);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessCourse]);
  useEffect(() => {
    if (isSuccess) {
      const dataAllLesson = data?.data?.lesson ?? [];
      setDataCourse(dataAllLesson);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  console.log(show);
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
  if (isLoading || isLoadingCourse) {
    return <Loading isLoading={isLoading || isLoadingCourse}></Loading>;
  }
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
            {(user?.isRole === "admin" || user?.isRole === "teacher") && (
              <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                <Panel header={data.nameLesson} key={data._id}>
                  <div
                    className={styles.updateCourse}
                    onClick={() => handleUpdate(data._id)}
                  >
                    {" "}
                    <FaPencilAlt />
                  </div>

                  <p>{data.description}</p>
                </Panel>
              </Collapse>
            )}
            {user?.isRole === "student" && show && (
              <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                <Panel header={data.nameLesson} key={data._id}>
                  <p>{data.description}</p>
                </Panel>
              </Collapse>
            )}
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
