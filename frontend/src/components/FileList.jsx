import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFiles, uploadFile } from "../features/fileService";
import { setFiles } from "../redux/slices/files";
import File from "./File";

export default function FileList() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
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
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedFile);
    if (selectedFile) {
      const resData = await uploadFile(userId, token, formData);
      dispatch(setFiles({ files: resData }));
    }
  };

  useEffect(() => {
    getUserFiles();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!files) {
    return (
      <>
        <div className="flex justify-center items-center h-12">
          <h1 className=" text-lg">No files available...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex-none grid grid-cols-3 gap-4 my-4">
        <input
          type="text"
          id="search"
          placeholder="Search files..."
          onChange={handleSearchChange}
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
      {files
        .filter((file) => {
          return (
            file.name.toLowerCase().includes(searchField.toLowerCase()) ||
            searchField === ""
          );
        })
        .map(({ _id, name, objectKey, size, createdAt }) => (
          <File
            key={_id}
            id={_id}
            objectKey={objectKey}
            name={name}
            size={size}
          />
        ))}
    </>
  );
}
