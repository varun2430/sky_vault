import { Schema, model } from "mongoose";

const fileSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const File = model("File", fileSchema);
export default File;
