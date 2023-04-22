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
            <p>Name:{detailTeacher?.name}</p>
            <p></p>
          </div>
        </div>
      )}
    </div>
  );
};
export default TeacherPanel;
