import { useEffect, useState } from "react";
import styles from "./ManageStatistical.module.css";
import axios from "../../../../../services/axiosInterceptor";
import { useMutationHooks } from "../../../../../hook/useMutationHook";
import * as OrderServices from "../../../../../services/OrderServices";
import * as UserServices from "../../../../../services/UserServices";
import moment from "moment";
import ChartManage from "./chart/ChartManage";
import { convertPrice } from "../../../../../utils";
const ExcelJS = require("exceljs");
const ManageStatistical = () => {
  const [totalAllOrder, setTotalAllOrder] = useState("");

  const [dataOrder, setDataOrder] = useState([]);
  const [user, setUser] = useState();
  const mutation = useMutationHooks((data) => OrderServices.getAllOrder());
  const { data, isSuccess, isLoading } = mutation;
  const date = new Date().getTime();
  console.log(date);
  useEffect(() => {
    mutation.mutate();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const dataAllOrder = data?.data;
      setDataOrder(dataAllOrder);
      const priceOrder = dataAllOrder.map((data) => data.totalPrice);
      let sum = 0;
      for (const a of priceOrder) {
        sum += a;
        setTotalAllOrder(sum);
        console.log(totalAllOrder);
      }
    }
  }, [isSuccess]);

  // const exportExcel = () => {
  //   var wb = XLSX.utils.book_new(),
  //     ws = XLSX.utils.json_to_sheet(dataOrder);
  //   XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
  //   XLSX.writeFile(wb, "MyEX.xlsx");
  // };
  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 80;
    sheet.columns = [
      {
        header: "Tên khóa học",
        key: "Tên",
        width: 20,
      },
      {
        header: "Email người mua",
        key: "User",
        width: 20,
      },
      {
        header: "Ngày mua",
        key: "Ngày",
        width: 15,
      },
      {
        header: "Tổng hóa đơn",
        key: "Tiền",
        width: 10,
      },
    ];
    const myExportData = data?.data.map((data) => {
      sheet.addRow({
        Tên: data?.orderItems.map((items) => items.name),
        User: data?.userEmail,
        Ngày: moment(data?.createdAt).format("hh:mm:ss"),
        Tiền: convertPrice(data?.totalPrice),
      });
    });
    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "ThongKe.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
    console.log("Export", myExportData);
  };
  return (
    <div className={styles.manageCourseTable}>
      <ChartManage />
      <p>Quản lý hóa đơn</p>
      <h3>Tổng hóa đơn:{convertPrice(totalAllOrder)}</h3>

      <button onClick={handleExport}>Xuat file</button>
      <table>
        <thead className={styles.courseTitle}>
          <tr>
            <th>Tên khóa học đã mua</th>
            <th>Người mua</th>
            <th>Số tiền</th>
            <th>Thời gian tạo</th>
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
                <th>{data.userEmail}</th>
                <th>{convertPrice(data.totalPrice)}</th>
                <th>{moment(data.createdAt).format("hh:mm:ss")}</th>
                <th>{moment(data.createdAt).format("YYYY-MM-DD ")}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ManageStatistical;
