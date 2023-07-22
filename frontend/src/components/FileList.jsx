import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getFiles, uploadFile } from "../features/fileService";
import { setFiles } from "../redux/slices/files";
import File from "./File";

export default function FileList() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  const encryption_key = useSelector((state) => state.auth.encryption_key);
  const filesSize = useSelector((state) => state.files.filesSize);
  const filesCount = useSelector((state) => state.files.filesCount);
  const files = useSelector((state) => state.files.files);
  const [searchField, setSearchField] = useState("");
  const fileInputRef = useRef(null);

  const getUserFiles = async () => {
    const resData = await getFiles(userId, token);
    dispatch(setFiles({ files: resData }));
  };

  const handleSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (filesSize / 1000 + file.size / 1000000 > 8) {
        toast.error("File storage limit reached!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      if (filesCount + 1 > 10) {
        toast.error("File count limit reached!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      const resData = await toast.promise(
        uploadFile(userId, file, token, encryption_key),
        {
          pending: "Uploading file...",
          success: "File uploaded successfully.",
          error: "Failed to upload file.",
        }
      );
      dispatch(setFiles({ files: resData }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserFiles();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="flex-none grid grid-cols-3 gap-4 my-4">
        <input
          type="text"
          id="search"
          placeholder="Search files..."
          onChange={handleSearchChange}
          className=" col-span-2 border-2 px-2 py-1 text-base rounded-md focus:outline-none focus:ring-0 focus:border-blue-700 placeholder:text-gray-700 bg-gray-300"
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
          className="border-2 border-blue-700 bg-blue-800 text-slate-100 py-1 rounded-md hover:bg-transparent hover:text-slate-100 font-semibold"
        >
          Upload
        </button>
      </div>
      <div className="mb-4">
        {files === null || files.length === 0 ? (
          <div className="flex justify-center items-center text-base text-slate-100 h-12">
            <h1 className=" text-lg">No files available...</h1>
          </div>
        ) : (
          files
            .filter((file) => {
              return (
                file.name.toLowerCase().includes(searchField.toLowerCase()) ||
                searchField === ""
              );
            })
            .reverse()
            .map(({ _id, name, objectKey, createdAt, size }) => (
              <File
                key={_id}
                id={_id}
                name={name}
                objectKey={objectKey}
                createdAt={createdAt}
                size={size}
              />
            ))
        )}
      </div>
    </>
  );
}
