import { Link, useParams } from "react-router-dom";
import styles from "./MenuDetail.module.css";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { useMutationHooks } from "../../../hook/useMutationHook";
import * as OrderServices from "../../../services/OrderServices";
import { useSelector } from "react-redux";
const MenuDetail = () => {
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(true);
  const { id } = useParams();
  const idUser = user?.id;
  const onChange = (key) => {
    console.log(key);
  };

  const mutation = useMutationHooks((data) => OrderServices.getAllOrder());
  const { data, isLoading, isSuccess } = mutation;

  useEffect(() => {
    mutation.mutate();
  }, []);
  useEffect(() => {
    if (isSuccess) {
      const dataOrderByUser = data?.data.filter((element) =>
        element.user.includes(idUser)
      );

      const soSanh = dataOrderByUser
        ?.map((courses) =>
          courses.orderItems?.map((nameOrder) => nameOrder.course)
        )
        ?.filter((element) => element.includes(id))
        ?.some((element) => element.includes(id));
      console.log(soSanh);
      if (soSanh) {
        setShow(false);
      }
    }
  }, [isSuccess]);
  const link = () => {
    if (show) {
      <Link to="lesson">Tài liệu</Link>;
    } else {
      return "Tài liệu";
    }
  };
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
      label: <Link to="#">Vào học</Link>,
      children: `Content of Tab Pane 3`,
    },
  ];
  return (
    <div className={styles.menuStyles}>
      <Tabs defaultActiveKey="1" items={items} onChange={() => onChange()} />;
    </div>
  );
};
export default MenuDetail;
