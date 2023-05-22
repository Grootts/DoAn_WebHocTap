import { useParams } from "react-router-dom";
import Lesson from "../../../allcourses/lesson/Lesson";
import axios from "../../../../../services/axiosInterceptor";
import styles from "./ManageLesson.module.css";
import { useState } from "react";
import { Modal } from "antd";

const ManageLesson = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateLesson, setStateLesson] = useState({
    nameLesson: "",
    description: "",
  });

  const { id } = useParams();
  const handleAddLesson = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOnchange = (e) => {
    setStateLesson({
      ...stateLesson,
      [e.target.name]: e.target.value,
    });
    console.log(stateLesson);
  };
  const handleOk = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `api/lesson/add-lesson/${id}`,
        stateLesson
      );
      if (response.status === 200) {
        alert("Thêm khóa học thành công");
        setStateLesson({ nameLesson: "", description: "" });
        return setIsModalOpen(false);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className={styles.lessonStyles}>
      <div className={styles.addCourse} onClick={handleAddLesson}>
        Thêm bài học
      </div>

      <Modal
        title="Thêm bài học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
          <div className={styles.inputAdd}>
            <p>Tên bài học:</p>
            <input
              placeholder="Enter name lesson"
              type="text"
              name="nameLesson"
              value={stateLesson.nameLesson}
              onChange={handleOnchange}
              required
            />
          </div>
          <div className={styles.inputAdd}>
            <p>Thông tin bài học:</p>
            <textarea
              placeholder="Enter description"
              type="text"
              name="description"
              value={stateLesson.description}
              onChange={handleOnchange}
            />
          </div>
        </form>
      </Modal>
      <Lesson reLoad={isModalOpen} />
    </div>
  );
};
export default ManageLesson;
