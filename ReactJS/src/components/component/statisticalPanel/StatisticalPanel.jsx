import styles from "./StatisticalPanel.module.css";
const StatisticalPanel = ({ title, count }) => {
  return (
    <div className={styles.statisticalStyles}>
      <h1>{title}</h1>
      <h1>{count}</h1>
    </div>
  );
};
export default StatisticalPanel;
