import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import DoughnutCharts from "../components/DoughnutCharts";
import FileList from "../components/FileList";

export default function Dashboard() {
  const userName = useSelector((state) => state.auth.user.username);

  return (
    <>
      <div className="min-h-screen flex flex-col gap-2">
        <Navbar />
        <div className="mx-6 mt-3 md:mx-8">
          <h1 className="text-md md:text-lg text-slate-100 font-semibold">{`Welcome, ${userName}! 🌌✨ Your files in the cloud are all set and waiting for you!`}</h1>
        </div>
        <DoughnutCharts />
        <div className=" mx-6 mt-1 md:mx-8 md:mt-1 flex-1">
          <h1 className="text-2xl text-slate-100 font-semibold">My vault</h1>
          <FileList />
        </div>
      </div>
    </>
  );
}
