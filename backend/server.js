//  SkyVault a secure cloud storege Saas.
//  Copyright (C) 2023  Varun Prashant Kadkade

//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.

//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.

//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
