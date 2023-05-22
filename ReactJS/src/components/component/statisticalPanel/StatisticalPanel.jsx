import styles from "./StatisticalPanel.module.css";
const StatisticalPanel = ({ title, count, icon }) => {
  return (
    <div className={styles.statisticalStyles}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>
        <h1>{count}</h1>
        <p>{title}</p>
      </div>
    </div>
  );
};
export default StatisticalPanel;
