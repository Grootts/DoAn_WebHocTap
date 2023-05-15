import { FaBookOpen, FaUserGraduate } from "react-icons/fa";
import * as UserServices from "../../../../services/UserServices";
import * as CourseServices from "../../../../services/CourseServices";
import * as OrderServices from "../../../../services/OrderServices";
import { GiReceiveMoney, GiTeacher } from "react-icons/gi";
import StatisticalPanel from "../../../component/statisticalPanel/StatisticalPanel";
import styles from "./StatisticalHome.module.css";
import { useMutationHooks } from "../../../../hook/useMutationHook";
import { useEffect, useState } from "react";
import { convertPrice } from "../../../../utils";
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
  const mutationMoney = useMutationHooks((dataMoney) =>
    OrderServices.getAllOrder()
  );
  const {
    data: dataMoney,
    isSuccess: isSuccessMoney,
    isLoading: isLoadingMoney,
  } = mutationMoney;
  useEffect(() => {
    mutation.mutate();
    mutationCourse.mutate();
    mutationMoney.mutate();
  }, []);
  console.log(mutationCourse ?? []);
  console.log(dataCourse);
  console.log(dataMoney);
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
    if (isSuccessMoney) {
      const dataAllOrder = dataMoney?.data;
      const priceOrder = dataAllOrder?.map((data) => data.totalPrice);
      let sum = 0;
      for (const a of priceOrder) {
        sum += a;
        setCountMonney(sum);
      }
    }
  }, [isSuccess, isSuccessCourse, isSuccessMoney]);

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
