import { FaBookOpen, FaUserGraduate } from "react-icons/fa";
import * as UserServices from "../../../../services/UserServices";
import * as CourseServices from "../../../../services/CourseServices";
import { GiReceiveMoney, GiTeacher } from "react-icons/gi";
import StatisticalPanel from "../../../component/statisticalPanel/StatisticalPanel";
import styles from "./StatisticalHome.module.css";
import { useMutationHooks } from "../../../../hook/useMutationHook";
import { useEffect, useState } from "react";
const StatisticalHome = () => {
  const [countStudent, setCountStudent] = useState(0);
  const [countTeacher, setCountTeacher] = useState(0);
  const [countCourse, setCountCourse] = useState(0);
  const [countMonney, setCountMonney] = useState(0);

  const mutation = useMutationHooks((data) => UserServices.getAllUser());
  const { data, isSuccess, isLoading } = mutation;
  //course
  const mutationCourse = useMutationHooks((dataCourse) =>
    CourseServices.getAllCourse()
  );
  const {
    data: dataCourse,
    isSuccess: isSuccessCourse,
    isLoading: isLoadingCourse,
  } = mutationCourse;
  useEffect(() => {
    mutation.mutate();
    mutationCourse.mutate();
  }, []);
  console.log(mutationCourse ?? []);
  console.log(dataCourse);
  console.log(isSuccessCourse);
  useEffect(() => {
    if (isSuccess) {
      const dataAllTeacher =
        data?.data.filter((element) => element.role.includes("teacher")) ?? [];
      setCountTeacher(dataAllTeacher.length);
      const dataAllStudent =
        data?.data.filter((element) => element.role.includes("student")) ?? [];
      setCountStudent(dataAllStudent.length);
    }
    if (isSuccessCourse) {
      const dataAllCourse = dataCourse?.total;
      console.log(dataAllCourse);
      setCountCourse(dataAllCourse);
    }
  }, [isSuccess, isSuccessCourse]);

  const oks = [
    {
      icon: <FaUserGraduate size={60} />,
      title: "Học sinh",
      count: countStudent,
    },
    { icon: <GiTeacher size={60} />, title: "Giáo viên", count: countTeacher },
    { icon: <FaBookOpen size={60} />, title: "Lớp học", count: countCourse },
    { icon: <GiReceiveMoney size={60} />, title: "Tiền", count: countMonney },
  ];
  return (
    <div className={styles.statisticalHome}>
      {oks.map((ok) => {
        return (
          <div>
            <StatisticalPanel
              icon={ok.icon}
              title={ok.title}
              count={ok.count}
            />
          </div>
        );
      })}
    </div>
  );
};
export default StatisticalHome;
