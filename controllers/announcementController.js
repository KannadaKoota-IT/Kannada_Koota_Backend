// import Announcement from "../models/announcement_model.js";

// // GET all announcements
// export const getAllAnnouncements = async (req, res) => {
//   try {
//     const announcements = await Announcement.find().sort({ date: -1 });
//     res.status(200).json({ success: true, announcements });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // ADD a new announcement
// export const addAnnouncement = async (req, res) => {
//   const { title, message} = req.body;

//   if (!title || !message) {
//     return res.status(400).json({ success: false, message: "Title and message are required" });
//   }

//   try {
//     const newAnnouncement = new Announcement({ title, message });
//     await newAnnouncement.save();
//     res.status(201).json({ success: true, announcement: newAnnouncement });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // UPDATE announcement
// export const updateAnnouncement = async (req, res) => {
//   const { id } = req.params;
//   const { title, message } = req.body;

//   try {
//     const updated = await Announcement.findByIdAndUpdate(
//       id,
//       { title, message},
//       { new: true }
//     );
//     res.status(200).json({ success: true, announcement: updated });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Update failed" });
//   }
// };

// // DELETE announcement
// export const deleteAnnouncement = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await Announcement.findByIdAndDelete(id);
//     res.status(200).json({ success: true, message: "Announcement deleted" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Delete failed" });
//   }
// };


import Announcement from "../models/announcement_model.js";

// GET all announcements
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.status(200).json({ success: true, announcements });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ADD a new announcement
export const addAnnouncement = async (req, res) => {
  try {
    const { title, message, link } = req.body;

    if (!title || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Title and message are required" });
    }

    let mediaUrl, mediaType, mediaPublicId;
    if (req.file) {
      mediaUrl = req.file.path; // Cloudinary gives file.path as URL
      mediaPublicId = req.file.filename; // Cloudinary public_id
      mediaType = req.file.mimetype.startsWith("image")
        ? "image"
        : req.file.mimetype.startsWith("video")
        ? "video"
        : "other";
    }

    const newAnnouncement = new Announcement({
      title,
      message,
      link,
      mediaUrl,
      mediaType,
      mediaPublicId,
    });

    await newAnnouncement.save();
    res.status(201).json({ success: true, announcement: newAnnouncement });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, link } = req.body;

    let updateData = { title, message, link };

    if (req.file) {
      updateData.mediaUrl = req.file.path;
      updateData.mediaPublicId = req.file.filename;
      updateData.mediaType = req.file.mimetype.startsWith("image")
        ? "image"
        : req.file.mimetype.startsWith("video")
        ? "video"
        : "other";
    }

    const updated = await Announcement.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Announcement not found" });
    }

    res.status(200).json({ success: true, announcement: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

// DELETE announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Announcement.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Announcement not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Announcement deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};
