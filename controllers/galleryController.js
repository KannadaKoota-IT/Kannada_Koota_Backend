import Gallery from "../models/gallery_model.js";
import cloudinary from "../utils/cloudinary.js";

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
  const { desc, link } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const mediaType = file.mimetype.startsWith("video") ? "video" : "image";

  const newMedia = new Gallery({
    desc,
    mediaUrl: file.path, // ✅ Cloudinary URL
    mediaType,
    publicId: file.filename, // ✅ needed to delete later
    link: link || "",
  });

  await newMedia.save();
  res.status(201).json({ success: true, media: newMedia });
};

// UPDATE media
export const updateMedia = async (req, res) => {
  const { id } = req.params;
  const { desc, link } = req.body;

  try {
    const updatedMedia = await Gallery.findByIdAndUpdate(
      id,
      { desc, link },
      { new: true }
    );

    if (!updatedMedia) {
      return res.status(404).json({ error: "Media not found" });
    }

    res.json({ success: true, media: updatedMedia });
  } catch (err) {
    console.error("Error updating media:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE media
export const deleteMedia = async (req, res) => {
  const { id } = req.params;
  try {
    const media = await Gallery.findByIdAndDelete(id);

    // ✅ also delete from Cloudinary
    if (media?.publicId) {
      await cloudinary.uploader.destroy(media.publicId, {
        resource_type: media.mediaType === "video" ? "video" : "image",
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting media:", err);
    res.status(500).json({ error: "Server error" });
  }
};
