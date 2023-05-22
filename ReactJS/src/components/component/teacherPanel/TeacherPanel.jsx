import styles from "./TeacherPanel.module.css";
import { useEffect, useState } from "react";
import * as UserServices from "../../../services/UserServices";
import { useMutationHooks } from "../../../hook/useMutationHook";
import avatar from "../../../image/avatar.png";
const TeacherPanel = ({ id }) => {
  const [detailTeacher, setDetailTeacher] = useState([]);
  const mutation = useMutationHooks((id) => UserServices.getDetailUser(id));
  const { data, isSuccess } = mutation;
  useEffect(() => {
    mutation.mutate(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setDetailTeacher(data?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className={styles.teacherPanel}>
      {isSuccess && (
        <div className={styles.teacherDetail} key={detailTeacher?.id}>
          <img alt="" src={avatar} />
          <div>
            <p>{detailTeacher?.name}</p>
            <div className={styles.textDetail}>
              {detailTeacher?.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TeacherPanel;
