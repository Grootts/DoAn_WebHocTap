import { useSelector } from "react-redux";
import styles from "./OrderPage.module.css";
const OrderPage = () => {
  const order = useSelector((state) => state.order);
  console.log(order);
  return (
    <div className={styles.orderPanel}>
      <h2>Giỏ hàng của bạn</h2>
      <div className={styles.orderList}>Có 0 khóa học trong giỏ hàng</div>
      <div className={styles.orderShopping}>
        <div className={styles.orderItem}>
          <div className={styles.orderItemText}>
            <img />
            <h4>Tên khóa học</h4>
          </div>
          <div className={styles.orderItemAction}>
            <p>Xóa</p>
            <p>Giá:</p>
          </div>
        </div>
        <div className={styles.orderPay}>
          <p>Tổng:</p>
          <div>Thanh toán</div>
        </div>
      </div>
    </div>
  );
};
export default OrderPage;
