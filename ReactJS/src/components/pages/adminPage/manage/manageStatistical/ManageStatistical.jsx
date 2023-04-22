import { useEffect, useState } from "react";
import styles from "./ManageStatistical.module.css";
import axios from "../../../../../services/axiosInterceptor";
const ManageStatistical = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [user, setUser] = useState();
  useEffect(() => {
    async function dataOrder() {
      const response = await axios.get("api/order/get-all-order");

      const data = response.data.data;
      setDataOrder(data);
      console.log(data);
    }

    dataOrder();
  }, []);
  const handleUser = async (id) => {
    try {
      const response = await axios.get(`api/user/get-details/${id}`);
      setUser(response.data.data.name);
      console.log(user);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className={styles.manageCourseTable}>
      <p>Quản lý hóa đơn</p>
      <table>
        <thead className={styles.courseTitle}>
          <tr>
            <th>Tên khóa học đã mua</th>
            <th>Người mua</th>
            <th>Số tiền</th>
            <th>Ngày tạo hóa đơn</th>
          </tr>
        </thead>
        <tbody className={styles.courseBody}>
          {dataOrder.map((data) => {
            return (
              <tr key={data._id}>
                <th>
                  {data.orderItems.map((dataItems) => {
                    return <div>{dataItems.name}</div>;
                  })}
                </th>
                <th>{handleUser(data.user) && <div>{user}</div>}</th>
                <th>{data.totalPrice}</th>
                <th>{data.createdAt}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ManageStatistical;
