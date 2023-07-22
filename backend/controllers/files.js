import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { s3Client } from "../server.js";
import File from "../models/File.js";

/* GET FILE */
export const getFiles = async (req, res) => {
  try {
    const { userId } = req.params;
    const files = await File.find({ userId: userId });
    res.status(200).json(files);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

/* GET S3 OBJECT */
export const getUrl = async (req, res) => {
  try {
    const { objectKey } = req.params;
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: objectKey,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command);
    res.status(200).json({ url: url });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

/* UPLOAD FILE */
export const uploadFile = async (req, res) => {
  try {
    const { userId } = req.params;
    const timestamp = new Date().getTime();
    const objectKey = `${timestamp}-${uuidv4().replace(/-/g, "")}`;
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: objectKey,
      Body: req.body.file,
    };
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    const newFile = new File({
      userId,
      name: req.body.name,
      objectKey,
      size: req.body.size,
    });
    await newFile.save();
    const files = await File.find({ userId: userId });
    res.status(201).json(files);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

/* DELETE FILE */
export const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findOne({ _id: fileId });
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: file.objectKey,
    };
    const command = new DeleteObjectCommand(params);
    const response = await s3Client.send(command);
    await File.deleteOne({ _id: fileId });
    res.status(200).json({ id: fileId });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};
