import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { deleteFile, getFiles, getUrl } from "../controllers/files.js";

const router = express.Router();

router.get("/:userId", verifyToken, getFiles);
router.get("/aws/:objectKey", verifyToken, getUrl);
router.delete("/:fileId", verifyToken, deleteFile);

export default router;
