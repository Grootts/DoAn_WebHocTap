import MenuAdmin from "../menuAdmin/MenuAdmin";
import styles from "./Body.module.css";
const Body = () => {
  return (
    <div className={styles.bodyStyles}>
      Body
      <MenuAdmin />
    </div>
  );
};
export default Body;
