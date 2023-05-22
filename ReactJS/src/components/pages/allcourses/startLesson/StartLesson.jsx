import { useState } from "react";
import axios from "../../../../services/axiosInterceptor";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./StartLesson.module.css";
const StartLesson = () => {
  const { id } = useParams();
  const [roomCode, setRoomCode] = useState({
    room: "",
  });
  const navigate = useNavigate();

  const handelCreateRoom = async (id) => {
    setRoomCode({
      room: Math.random().toString(36).substr(2),
    });
    console.log(roomCode);
    const response = await axios.put(`api/course/update/${id}`, roomCode);

    if (response.status === 200 && roomCode.room !== "") {
      alert("Tạo phòng thành công");
      console.log(roomCode);
      if (roomCode.room) {
        navigate(`room/${roomCode.room}`);
      }
    }
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
