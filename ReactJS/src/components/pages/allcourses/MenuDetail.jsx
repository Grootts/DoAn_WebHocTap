import { Link } from "react-router-dom";
import styles from "./MenuDetail.module.css";
import { Tabs } from "antd";
const MenuDetail = () => {
  const data = localStorage.getItem("token");
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: <Link to="">Giới thiệu</Link>,
    },
    {
      key: "2",
      label: <Link to="lesson">Tài liệu</Link>,
    },
    {
      key: "3",
      label: <Link to="#">Vào học</Link>,
      children: `Content of Tab Pane 3`,
    },
  ];
  return (
    <div className={styles.menuStyles}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
    </div>
  );
};
export default MenuDetail;
