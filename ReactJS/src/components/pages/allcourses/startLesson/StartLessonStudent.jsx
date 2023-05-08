import { useEffect, useState } from "react";
import { api } from "../../../../api";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../../services/axiosInterceptor";
import styles from "./StartLesson.module.css";
const StartLessonStudent = () => {
  const user = useSelector((state) => state.user);
  const [roomCode, setRoomCode] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const handelCreateRoom = async () => {
    const response = await axios.get(`api/course/get-details/${id}`);
    const room = response?.data?.data.room;
    setRoomCode(room);
    if (
      response.status === 200 &&
      room !== undefined &&
      roomCode !== undefined
    ) {
      navigate(`room/${roomCode}`);
    }
  };
 
  return (
    <div className={styles.startLessonPanel}>
      <div style={{ fontSize: "40px", fontWeight: "700", color: "white" }}>
        Bắt đầu học ngay bây giờ
      </div>
      <div className={styles.startLessonCode}>
        <button onClick={() => handelCreateRoom(id)}>Vào học</button>
      </div>
    </div>
  );
};
export default StartLessonStudent;
