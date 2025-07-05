import Gallery from "../models/gallery_model.js";

// GET all media
export const getAllMedia = async (req, res) => {
  try {
    const media = await Gallery.find().sort({ uploadedAt: -1 });
    res.json(media);
  } catch (err) {
    console.error("Error fetching gallery:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// POST new media
export const uploadMedia = async (req, res) => {
  const { title } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const mediaType = file.mimetype.startsWith("video") ? "video" : "image";

  const newMedia = new Gallery({
    title,
    mediaUrl: `/uploads/gallery/${file.filename}`,
    mediaType
  });

  await newMedia.save();
  res.status(201).json({ success: true, media: newMedia });
};

// DELETE media
export const deleteMedia = async (req, res) => {
  const { id } = req.params;
  try {
    await Gallery.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting media:", err);
    res.status(500).json({ error: "Server error" });
  }
};
