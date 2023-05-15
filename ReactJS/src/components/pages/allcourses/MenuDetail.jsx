import { Link, useParams } from "react-router-dom";
import styles from "./MenuDetail.module.css";
import { Tabs } from "antd";
import { useState } from "react";

const MenuDetail = ({ show1 }) => {
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
      label: show1 ? "Tài liệu" : <Link to="lesson">Tài liệu</Link>,
      disabled: show1,
    },
    {
      key: "3",
      label: show1 ? "Vào học" : <Link to="call">Vào học</Link>,

      disabled: show1,
    },
  ];
  return (
    <div className={styles.menuStyles}>
      <Tabs defaultActiveKey="1" items={items} onChange={() => onChange()} />;
    </div>
  );
};
export default MenuDetail;
