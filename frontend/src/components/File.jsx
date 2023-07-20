import { useSelector, useDispatch } from "react-redux";
import { getFiles, deleteFile, getObjectUrl } from "../features/fileService";
import { setFiles } from "../redux/slices/files";
import axios from "axios";

export default function File(props) {
  const userId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleFileDelete = async () => {
    const resData = await deleteFile(props.id, token);
    if (resData) {
      const resData = await getFiles(userId, token);
      dispatch(setFiles({ files: resData }));
    }
  };

  const handleFileDownload = async () => {
    const resData = await getObjectUrl(props.objectKey, token);
    const objectUrl = resData.url;
    const response = await axios({
      url: objectUrl,
      method: "GET",
      responseType: "blob",
    });
    const url = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", props.name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const formatDateTime = (dateTime) => {
    const parsedDate = new Date(dateTime);
    const formattedDate = parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = parsedDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <>
      <div className="flex bg-slate-700 hover:bg-slate-600 bg-opacity-70 rounded">
        <div className="p-2 truncate text-sm text-slate-100 w-full">
          {props.name}
        </div>
        <div className="hidden md:flex md:justify-start md:items-center truncate text-sm text-slate-100 p-2 w-72">
          {formatDateTime(props.createdAt)}
        </div>
        <div className="flex justify-center items-center truncate text-sm text-slate-100 p-2 w-36">
          {props.size / 1000} KB
        </div>
        <div className="flex justify-center items-center p-2 w-14">
          <button onClick={handleFileDownload}>
            <i className="fa-solid fa-download text-green-500"></i>
          </button>
        </div>
        <div className="flex justify-center items-center p-2 w-14">
          <button onClick={handleFileDelete}>
            <i className="fa-solid fa-trash text-red-500"></i>
          </button>
        </div>
      </div>
    </>
  );
}
