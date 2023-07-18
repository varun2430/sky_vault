import { useSelector } from "react-redux";
import File from "./File";

export default function FileList() {
  const files = useSelector((state) => state.files.files);

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
      {files.map(({ _id, name, size, createdAt }) => (
        <File key={_id} id={_id} name={name} size={size} />
      ))}
    </>
  );
}
