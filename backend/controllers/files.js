import File from "../models/File.js";

/* GET FILE */
export const getFiles = async (req, res) => {
  try {
    const { userId } = req.params;
    const files = await File.find({ userId: userId });
    res.status(202).json(files);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

/* UPLOAD FILE */
export const uploadFile = async (req, res) => {
  try {
    const { userId, name, size } = req.body;
    const newFile = new File({
      userId,
      name,
      size,
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

    await File.deleteOne({ _id: fileId });
    res.status(200).json({ id: fileId });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};
