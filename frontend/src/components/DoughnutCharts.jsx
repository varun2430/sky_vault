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
        data: [filesSize / 1000, 8 - filesSize / 1000],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
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
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const sizeOptions = {
    plugins: {
      title: {
        display: true,
        text: "Storage Used (Max: 8 MB)",
        color: "rgb(241 245 249)",
        font: {
          size: 16,
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "rgb(241 245 249)",
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
        text: "File Count (Max: 10 Files)",
        color: "rgb(241 245 249)",
        font: {
          size: 16,
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "rgb(241 245 249)",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className="flex-none grid grid-cols-1 md:grid-cols-2">
        <div className=" mx-6 my-3 md:ml-8 md:mr-4 md:my-4 h-44 md:h-72 bg-slate-700 bg-opacity-70 rounded-lg">
          <Doughnut data={sizeData} options={sizeOptions} />
        </div>
        <div className=" mx-6 my-3 md:ml-4 md:mr-8 md:my-4 h-44 md:h-72 bg-slate-700 bg-opacity-70 rounded-lg">
          <Doughnut data={countData} options={countOptions} />
        </div>
      </div>
    </>
  );
}
