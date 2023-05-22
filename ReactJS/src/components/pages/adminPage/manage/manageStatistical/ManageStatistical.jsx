import { useEffect, useState } from "react";
import styles from "./ManageStatistical.module.css";
import { useMutationHooks } from "../../../../../hook/useMutationHook";
import * as OrderServices from "../../../../../services/OrderServices";
import moment from "moment";
import ChartManage from "./chart/ChartManage";
import { convertPrice } from "../../../../../utils";
import { RiFileExcel2Fill } from "react-icons/ri";
import Loading from "../../../../component/loading/Loading";
const ExcelJS = require("exceljs");
const ManageStatistical = () => {
  const [totalAllOrder, setTotalAllOrder] = useState("");

  const [dataOrder, setDataOrder] = useState([]);
  const mutation = useMutationHooks((data) => OrderServices.getAllOrder());
  const { data, isSuccess, isLoading } = mutation;
  const date = new Date().getTime();
  console.log(date);
  useEffect(() => {
    mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // const exportExcel = () => {
  //   var wb = XLSX.utils.book_new(),
  //     ws = XLSX.utils.json_to_sheet(dataOrder);
  //   XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
  //   XLSX.writeFile(wb, "MyEX.xlsx");
  // };
  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    // const sheet = workbook.addWorksheet("My Sheet", {
    //   headerFooter: {
    //     firstHeader: "Hello Exceljs",
    //     firstFooter: "Hello World",
    //   },
    // });

    const sheet = workbook.addWorksheet("sheet");

    //sheet.properties.defaultRowHeight = 80;
    // sheet.addRow = { header: "Thống kê" };

    // sheet.mergeCells("A1:B2");

    // sheet.getCell("B2").value = "Hello, World!";
    // Modify/Add individual cell
    // sheet.insertRow(1, { id: 1, name: "John Doe", dob: new Date(1970, 1, 1) });

    sheet.getRow(1).font = {
      name: "Comic Sans MS",
      family: 4,
      size: 16,
      bold: true,
    };
    sheet.getRow.font = {
      name: "Roboto",
      family: 2,
      size: 8,
      bold: true,
    };
    sheet.columns = [
      {
        header: "Tên khóa học",
        key: "Tên",
        width: 60,
      },
      {
        header: "Email người mua",
        key: "User",
        width: 30,
      },
      {
        header: "Ngày mua",
        key: "Ngày",
        width: 15,
      },
      {
        header: "Tổng hóa đơn",
        key: "Tiền",
        width: 50,
      },
    ];
    const myExportData = data?.data.map((data) =>
      sheet.addRow({
        Tên: data?.orderItems.map((items) => items.name),
        User: data?.userEmail,
        Ngày: moment(data?.createdAt).format("YYYY-MM-DD"),
        Tiền: convertPrice(data?.totalPrice),
      })
    );

    sheet.addRow({
      Tên: "Tổng tiền",
      Tiền: convertPrice(totalAllOrder),
    });

    const priceCol = sheet.getColumn(3);

    // iterate over all current cells in this column
    priceCol.eachCell((cell) => {
      const cellValue = sheet.getCell(cell?.address).value;
      // add a condition to set styling
      if (cellValue > 50 && cellValue < 1000) {
        sheet.getCell(cell?.address).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF0000" },
        };
      }
    });

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "download.xlsx";
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

      <div onClick={handleExport} className={styles.addCourse}>
        Xuất file <RiFileExcel2Fill />
      </div>
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
      <Loading isLoading={isLoading}></Loading>
    </div>
  );
};
export default ManageStatistical;
