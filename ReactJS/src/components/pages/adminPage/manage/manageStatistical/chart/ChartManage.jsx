import { useEffect, useState } from "react";

import * as OrderServices from "../../../../../../services/OrderServices";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useMutationHooks } from "../../../../../../hook/useMutationHook";
import moment from "moment";
import "chartjs-adapter-date-fns";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const ChartManage = () => {
  const [dataApi, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh thu",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "#ff0000",
      },
    ],
    borderWidth: 1,
  });
  const [updateMonth, setupdateMonth] = useState({
    scales: {
      x: {
        type: "time",
        min: "2023-01-01",
        max: "2023-12-31",
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: true,
      },
    },

    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Biểu đồ doanh thu",
      },
    },
  });
  const mutation = useMutationHooks((data) => OrderServices.getAllOrder());
  const { data, isSuccess } = mutation;
  const [month, setMonth] = useState();

  const handleFilterMonth = (e) => {
    const { value } = e.target;
    setMonth(value);
    const year = value?.substring(0, 4);
    const monthday = value?.substring(5, 7);
    const lastDay = (y, m) => {
      return new Date(y, m, 0).getDate();
    };
    const startDate = `${value}-01`;
    const endDate = `${value}-${lastDay(year, monthday)}`;
    setupdateMonth({
      scales: {
        x: {
          type: "time",
          min: startDate,
          max: endDate,
          time: {
            unit: "day",
          },
        },
        y: {
          beginAtZero: true,
        },
      },

      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Biểu đồ doanh thu",
        },
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      const dataAllOrder = data?.data;
      const priceOrder = dataAllOrder.map((data) => {
        return data.totalPrice;
      });

      console.log(priceOrder);
      const labelSet = [];
      const dataSet1 = [];
      for (const val of dataAllOrder) {
        const loc = [];
        loc.push(val.totalPrice, val);
        dataSet1.push(val.totalPrice);
        console.log(dataSet1);
        const dayOrder = moment(val.createdAt).format("YYYY-MM-DD hh");
        labelSet.push(dayOrder);
      }
      setData({
        labels: labelSet,
        datasets: [
          {
            label: "Dataset ID",
            data: dataSet1,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "#ff0000",
          },
        ],
      });
      console.log("arrData", dataSet1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  useEffect(() => {
    mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: "900px", height: "80%" }}>
      {console.log("dataaaaaaaa", dataApi)}
      <Bar data={dataApi} options={updateMonth} />

      <input type="month" value={month} onChange={handleFilterMonth} />
    </div>
  );
};
export default ChartManage;
