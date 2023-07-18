import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../features/fileService";
import Navbar from "../components/Navbar";
import FileList from "../components/FileList";
import { setFiles } from "../redux/slices/files";
import DoughnutCharts from "../components/DoughnutCharts";

export default function Dashboard() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.user.firstName);
  const userId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const file = {
        name: selectedFile.name,
        size: Math.round(selectedFile.size / 1000),
      };
      const resData = await uploadFile(userId, token, file);
      dispatch(setFiles({ files: resData }));
    }
  };

  const getUserFiles = async () => {
    const resData = await getFiles(userId, token);
    dispatch(setFiles({ files: resData }));
  };

  useEffect(() => {
    getUserFiles();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col gap-2 bg-blue-800">
        <div className="h-12 bg-blue-200 p-2">
          <h1 className="text-2xl font-semibold">{`Welcome, ${userName}`}</h1>
        </div>
        <DoughnutCharts />
        <div className=" flex-1 bg-blue-200 p-4">
          <h1 className="text-2xl font-semibold">My vault</h1>
          <div className="flex-none grid grid-cols-3 gap-4 my-4">
            <input
              type="text"
              id="search"
              placeholder="Search files..."
              className=" col-span-2 border-2 px-2 py-1 text-base rounded-md focus:outline-none focus:ring-0 focus:border-blue-400"
            ></input>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={(e) => {
                fileInputRef.current.click();
              }}
              className=" border-2 border-blue-700 bg-blue-700 text-white py-1 rounded-md hover:bg-transparent hover:text-blue-700 font-semibold"
            >
              Upload
            </button>
          </div>
          <FileList />
        </div>
      </div>
    </>
  );
}
