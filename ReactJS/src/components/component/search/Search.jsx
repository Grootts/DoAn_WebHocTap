import styles from "./Search.module.css";
import { IoMdSearch } from "react-icons/io";
const Search = () => {
  return (
    <div className={styles.newletter}>
      <div className={styles.right}>
        <input type="text" placeholder="Tìm kiếm khóa học ..." />
        <IoMdSearch className={styles.icon} size={30} />
      </div>
    </div>
  );
};
export default Search;
