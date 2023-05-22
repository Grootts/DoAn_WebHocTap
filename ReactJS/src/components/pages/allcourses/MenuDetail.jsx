import { Link } from "react-router-dom";
import styles from "./MenuDetail.module.css";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MenuDetail = ({ show1 }) => {
  const onChange = (key) => {
    console.log(key);
  };
  console.log(show1);
  const [show, setShow] = useState(true);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user?.id !== "") {
      setShow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const items = [
    {
      key: "1",
      label: <Link to="">Giới thiệu</Link>,
    },
    {
      key: "2",
      label: show ? "Tài liệu" : <Link to="lesson">Tài liệu</Link>,
      disabled: show,
    },
    {
      key: "3",
      label: show ? "Vào học" : <Link to="call">Vào học</Link>,

      disabled: show,
    },
  ];
  return (
    <div className={styles.menuStyles}>
      <Tabs defaultActiveKey="1" items={items} onChange={() => onChange()} />;
    </div>
  );
};
export default MenuDetail;
