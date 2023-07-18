import { useSelector, useDispatch } from "react-redux";
import { getFiles, deleteFile } from "../features/fileService";
import { setFiles } from "../redux/slices/files";

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

  return (
    <>
      <div className="flex bg-gray-200 hover:bg-gray-300">
        <div className="w-3/6 p-2 truncate">{props.name}</div>
        <div className="flex justify-center items-center p-2 w-1/6 ">
          {props.size}
        </div>
        <div className="flex justify-center items-center p-2 w-1/6 ">
          <button>
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
