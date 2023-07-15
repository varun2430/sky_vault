import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { deleteFile, uploadFile } from "../controllers/files.js";

const router = express.Router();

router.post("/upload", verifyToken, uploadFile);
router.delete("/delete/:fileId", verifyToken, deleteFile);

export default router;
