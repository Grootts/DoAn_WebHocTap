import { useState } from "react";
import axios from "../../../../services/axiosInterceptor";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./StartLesson.module.css";
const StartLesson = () => {
  const { id } = useParams();
  const roomCode = id;
  const navigate = useNavigate();

  const handelCreateRoom = async (id) => {
    alert("Tạo phòng thành công");
    console.log(roomCode);

    navigate(`room/${roomCode}`);
  };

  return (
    <div className={styles.startLessonPanelAdmin}>
      <div style={{ fontSize: "40px", fontWeight: "700" }}>
        Bắt đầu học ngay bây giờ
      </div>
      <div className={styles.startLessonCode}>
        <button onClick={() => handelCreateRoom(id)}>Tạo lớp học</button>
      </div>
    </div>
  );
};
export default StartLesson;
