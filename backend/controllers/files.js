import File from "../models/File.js";

/* UPLOAD FILE */
export const uploadFile = async (req, res) => {
  try {
    const { userId, name, extension, size } = req.body;
    const newFile = new File({
      userId,
      name,
      extension,
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
