import styles from "./TeacherPanel.module.css";
import { useEffect, useState } from "react";
import * as UserServices from "../../../services/UserServices";
import { useMutationHooks } from "../../../hook/useMutationHook";
const TeacherPanel = ({ id }) => {
  const [detailTeacher, setDetailTeacher] = useState([]);
  const mutation = useMutationHooks((id) => UserServices.getDetailUser(id));
  const { data, isLoading, isSuccess } = mutation;
  useEffect(() => {
    mutation.mutate(id);
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setDetailTeacher(data?.data);
    }
  }, [isSuccess]);
  console.log(id);
  return (
    <div className={styles.teacherPanel}>
      {isSuccess && (
        <div className={styles.teacherDetail} key={detailTeacher?.id}>
          <img src="" />
          <div>
            <p>{detailTeacher?.name}</p>
            <div className={styles.textDetail}>
              Giới thiệu: Là một giáo viên tận tâm với nghề, kiến thức chuyên
              môn cao, luôn quan tâm tới học sinh. Có phong cách dạy học rất
              riêng và hiệu quả. Thầy thường dạy nhanh, các bài giảng cô đọng,
              súc tích và thích hợp với các bạn học sinh khá, giỏi. Trong mỗi
              bài giảng của thầy, lượng kiến thức được cung cấp khá lớn và đặc
              biệt là có sự bổ sung nhiều dạng bài tập phong phú với mức độ khó
              chiếm tỷ lệ cao.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TeacherPanel;
