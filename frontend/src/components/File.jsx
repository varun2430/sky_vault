import { useSelector, useDispatch } from "react-redux";
import { getFiles, downloadFile, deleteFile } from "../features/fileService";
import { setFiles } from "../redux/slices/files";
import { toast } from "react-toastify";

export default function File(props) {
  const userId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  const encryption_key = useSelector((state) => state.auth.encryption_key);
  const dispatch = useDispatch();

  const handleFileDelete = async () => {
    try {
      const resData = await toast.promise(deleteFile(props.id, token), {
        pending: "Deleting file...",
        success: "File deleted successfully.",
        error: "Failed to delete file.",
      });
      if (resData) {
        const resData = await getFiles(userId, token);
        dispatch(setFiles({ files: resData }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileDownload = async () => {
    try {
      await toast.promise(
        downloadFile(props.objectKey, props.name, token, encryption_key),
        {
          pending: "Downloading file...",
          success: "File downloaded successfully.",
          error: "Failed to download file.",
        }
      );
    } catch (err) {
      console.error(err);
    }
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
        <div className="flex justify-start items-center p-2 truncate text-sm text-slate-100 w-full">
          {props.name}
        </div>
        <div className="hidden md:flex md:justify-start md:items-center truncate text-sm text-slate-100 p-2 w-64">
          {formatDateTime(props.createdAt)}
        </div>
        <div className="flex justify-center items-center truncate text-sm text-slate-100 p-2 w-36">
          {props.size / 1000 < 1000
            ? `${(props.size / 1000).toFixed(1)} KB`
            : `${(props.size / 1000000).toFixed(1)} MB`}
        </div>
        <div className="flex justify-center items-center p-2 w-16">
          <button onClick={handleFileDownload}>
            <i className="fa-solid fa-download text-green-500"></i>
          </button>
        </div>
        <div className="flex justify-center items-center p-2 w-16">
          <button onClick={handleFileDelete}>
            <i className="fa-solid fa-trash text-red-500"></i>
          </button>
        </div>
      </div>
    </>
  );
}
