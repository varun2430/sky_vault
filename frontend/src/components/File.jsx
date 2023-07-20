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

  return (
    <>
      <div className="flex bg-gray-200 hover:bg-gray-300">
        <div className="w-3/6 p-2 truncate">{props.name}</div>
        <div className="flex justify-center items-center p-2 w-1/6 ">
          {props.size / 1000} KB
        </div>
        <div className="flex justify-center items-center p-2 w-1/6 ">
          <button onClick={handleFileDownload}>
            <i className="fa-solid fa-download"></i>
          </button>
        </div>
        <div className="flex justify-center items-center p-2 w-1/6 ">
          <button onClick={handleFileDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </>
  );
}
