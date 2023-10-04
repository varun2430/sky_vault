import fs from "fs";
import https from "https";
import express from "express";
import { S3Client } from "@aws-sdk/client-s3";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import filesRoutes from "./routes/file.js";
import { uploadFile } from "./controllers/files.js";
import { verifyToken } from "./middleware/auth.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const options = {
  cert: fs.readFileSync("/etc/ssl/certificate.crt"),
  ca: fs.readFileSync("/etc/ssl/ca_bundle.crt"),
  key: fs.readFileSync("/etc/ssl/private/private.key"),
};

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 50 * 1024 * 1024,
    fileSize: 50 * 1024 * 1024,
  },
});

/* HEALTH CHECK ENDPOINT */
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ROUTES WITH FILES */
app.post("/api/files/:userId", verifyToken, upload.single("file"), uploadFile);

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/files", filesRoutes);

const server = https.createServer(options, app);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`error connecting: ${err}`);
  });
