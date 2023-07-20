import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import FileList from "../components/FileList";
import DoughnutCharts from "../components/DoughnutCharts";

export default function Dashboard() {
  const userName = useSelector((state) => state.auth.user.firstName);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col gap-2 bg-blue-800">
        <div className="h-12 bg-blue-200 p-2">
          <h1 className="text-2xl font-semibold">{`Welcome, ${userName}`}</h1>
        </div>
        <DoughnutCharts />
        <div className=" m-1 md:m-2 flex-1 bg-blue-200 p-4">
          <h1 className="text-2xl font-semibold">My vault</h1>
          <FileList />
        </div>
      </div>
    </>
  );
}
