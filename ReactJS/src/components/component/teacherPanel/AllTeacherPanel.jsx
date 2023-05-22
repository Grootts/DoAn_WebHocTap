import styles from "./TeacherPanel.module.css";
import { useEffect, useState } from "react";
import * as UserServices from "../../../services/UserServices";
import { useMutationHooks } from "../../../hook/useMutationHook";
import avatar from "../../../image/avatar.png";
import Loading from "../loading/Loading";
const AllTeacherPanel = () => {
  const [detailTeacher, setDetailTeacher] = useState([]);
  const mutation = useMutationHooks((data) => UserServices.getAllUser());
  const { data, isLoading, isSuccess } = mutation;
  console.log(data);
  useEffect(() => {
    mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isSuccess) {
      const dataTeacher =
        data?.data?.filter((element) => element.role?.includes("teacher")) ??
        [];

      setDetailTeacher(dataTeacher);
      return console.log(dataTeacher);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  if (isLoading) {
    return <Loading isLoading={isLoading}></Loading>;
  }
  return (
    <div className={styles.teacherPanel}>
      {isSuccess &&
        detailTeacher.map((data) => {
          return (
            <div className={styles.teacherDetail} key={data?.id}>
              <img alt="" src={avatar} />
              <div>
                <p>{data?.name}</p>
                <div className={styles.textDetail}>{data?.description}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default AllTeacherPanel;
