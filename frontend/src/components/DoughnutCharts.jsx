import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function DoughnutCharts() {
  const filesSize = useSelector((state) => state.files.filesSize);
  const filesCount = useSelector((state) => state.files.filesCount);

  const sizeData = {
    labels: ["Used", "Available"],
    datasets: [
      {
        label: "MB",
        data: [filesSize / 1000, 16 - filesSize / 1000],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const countData = {
    labels: ["Used", "Available"],
    datasets: [
      {
        label: "Files",
        data: [filesCount, 10 - filesCount],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const sizeOptions = {
    plugins: {
      title: {
        display: true,
        text: "Storage Used",
        color: "black",
        font: {
          size: 16,
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "rgb(0, 0, 0)",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const countOptions = {
    plugins: {
      title: {
        display: true,
        text: "File Count",
        color: "black",
        font: {
          size: 16,
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "rgb(0, 0, 0)",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className="flex-none grid grid-cols-1 md:grid-cols-2">
        <div className=" m-1 md:m-2 bg-blue-200 h-44 md:h-72">
          <Doughnut data={sizeData} options={sizeOptions} />
        </div>
        <div className=" m-1 md:m-2 bg-blue-200 h-44 md:h-72">
          <Doughnut data={countData} options={countOptions} />
        </div>
      </div>
    </>
  );
}
