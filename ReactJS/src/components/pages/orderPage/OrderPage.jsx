import { useDispatch, useSelector } from "react-redux";
import styles from "./OrderPage.module.css";
import axios from "../../../services/axiosInterceptor";
import { MdDelete } from "react-icons/md";
import { removeOrderProduct } from "../../../redux/slide/orderSlide";
import { useEffect, useMemo, useState } from "react";
import { convertPrice } from "../../../utils";
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from "../../../services/PaymentServices";
const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  console.log(order);
  console.log(user);
  const handleDeleteCourse = (id) => {
    dispatch(removeOrderProduct({ id }));
  };
  const priceMemo = useMemo(() => {
    const result = order?.orderItems?.reduce((total, cur) => {
      return total + cur.price;
    }, 0);
    return result;
  }, [order]);
  const onSuccessPaypal = async (details, data) => {
    try {
      const res = await axios.post("api/order/create", {
        orderItems: order?.orderItems,
        totalPrice: priceMemo,
        user: user?.id,
        isPaid: true,
        paidAt: details.update_time,
      });
      if (res.status === 200) {
        alert("Tạo hóa đơn thành công");
      }
    } catch (error) {
      alert(error.res.data.message);
    }
  };
  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfig();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);
  return (
    <div className={styles.orderPanel}>
      <h2>Giỏ hàng của bạn</h2>
      <div className={styles.orderList}>
        Có {order?.orderItems?.length} khóa học trong giỏ hàng
      </div>
      <div className={styles.orderShopping}>
        <div>
          {order &&
            order.orderItems.map((course, index) => {
              return (
                <div>
                  <div className={styles.orderShopping}>
                    <div className={styles.orderItem} key={index}>
                      <div className={styles.orderItemText}>
                        <img src={course.image} />
                        <h4>Tên khóa học: {course.name}</h4>
                      </div>
                      <div className={styles.orderItemAction}>
                        <p
                          onClick={() => handleDeleteCourse(course.course)}
                          className={styles.iconDelete}
                        >
                          <MdDelete />
                        </p>
                        <p>Giá:{convertPrice(course.price)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className={styles.orderPay}>
          <p>Tổng:{convertPrice(priceMemo)}</p>
          {sdkReady && (
            <div>
              <PayPalButton
                amount={Math.round(priceMemo / 30000)}
                onSuccess={onSuccessPaypal}
                onError={() => {
                  alert("Erroe");
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderPage;
