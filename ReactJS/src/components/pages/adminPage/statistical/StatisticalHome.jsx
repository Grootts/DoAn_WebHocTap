import StatisticalPanel from "../../../component/statisticalPanel/StatisticalPanel";
import styles from "./StatisticalHome.module.css";
const StatisticalHome = () => {
  const oks = [
    { title: "ok1", count: 20 },
    { title: "ok2", count: 20 },
    { title: "ok3", count: 20 },
  ];
  return (
    <div className={styles.statisticalHome}>
      {oks.map((ok) => {
        return (
          <div>
            <StatisticalPanel title={ok.title} count={ok.count} />
          </div>
        );
      })}
    </div>
  );
};
export default StatisticalHome;
