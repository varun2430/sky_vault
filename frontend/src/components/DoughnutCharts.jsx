import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <>
      <div className="flex-none grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-200 p-2 h-40 md:h-64">
          <Doughnut data={sizeData} options={options} />
        </div>
        <div className="bg-blue-200 p-2 h-40 md:h-64">
          <Doughnut data={countData} options={options} />
        </div>
      </div>
    </>
  );
}
