import { useEffect, useState } from "react";
import * as CourseServices from "../../../../services/CourseServices";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../../services/axiosInterceptor";
import styles from "./StartLesson.module.css";
import { useMutationHooks } from "../../../../hook/useMutationHook";
const StartLessonStudent = () => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { id } = useParams();
  const roomCode = id;
  const [show, setShow] = useState(false);
  useEffect(() => {
    mutationCourse.mutate(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const mutationCourse = useMutationHooks((data) =>
    CourseServices.getDetailsCourse(data)
  );

  const { data: dataCourse, isSuccess: isSuccessCourse } = mutationCourse;

  useEffect(() => {
    if (isSuccessCourse) {
      const checkFollow = dataCourse?.data?.userFollow?.filter(
        (element) => element?.userId === user?.id
      );
      if (checkFollow?.length !== 0) {
        setShow(true);
      }
      console.log(checkFollow);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessCourse]);
  const handelCreateRoom = async (id) => {
    navigate(`room/${roomCode}`);
  };

  return (
    <div>
      {show && (
        <div className={styles.startLessonPanel}>
          <div style={{ fontSize: "40px", fontWeight: "700", color: "white" }}>
            Bắt đầu học ngay bây giờ
          </div>
          <div className={styles.startLessonCode}>
            <button onClick={() => handelCreateRoom(id)}>Start</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default StartLessonStudent;
