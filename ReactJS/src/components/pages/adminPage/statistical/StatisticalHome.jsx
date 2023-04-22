import { FaBookOpen, FaUserGraduate } from "react-icons/fa";

import { GiReceiveMoney, GiTeacher } from "react-icons/gi";
import StatisticalPanel from "../../../component/statisticalPanel/StatisticalPanel";
import styles from "./StatisticalHome.module.css";
const StatisticalHome = () => {
  const oks = [
    { icon: <FaUserGraduate size={60} />, title: "Học sinh", count: 20 },
    { icon: <GiTeacher size={60} />, title: "Giáo viên", count: 20 },
    { icon: <FaBookOpen size={60} />, title: "Lớp học", count: 20 },
    { icon: <GiReceiveMoney size={60} />, title: "Tiền", count: 20 },
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
