import { useDispatch, useSelector } from "react-redux";
import styles from "./OrderPage.module.css";
import axios from "../../../services/axiosInterceptor";
import { MdDelete } from "react-icons/md";
import {
  removeAllOrderProduct,
  removeOrderProduct,
} from "../../../redux/slide/orderSlide";
import { useEffect, useMemo } from "react";
import { convertPrice } from "../../../utils";
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from "../../../services/PaymentServices";
import { useNavigate } from "react-router-dom";
const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        userId: user?.id,
        userEmail: user?.email,
        isPaid: true,
        paidAt: details.update_time,
      });
      if (res.status === 200) {
        dispatch(removeAllOrderProduct());
        navigate("/courses");
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
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (window.paypal) {
      addPaypalScript();
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
                        <img alt="" src={course.image} />
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
          {
            <div>
              <PayPalButton
                amount={Math.round(priceMemo / 30000)}
                onSuccess={onSuccessPaypal}
                onError={() => {
                  alert("Erroe");
                }}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
};
export default OrderPage;
