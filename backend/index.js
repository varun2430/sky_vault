import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import filesRoutes from "./routes/file.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/files", filesRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`error connecting: ${err}`);
  });
