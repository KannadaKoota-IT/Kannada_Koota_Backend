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
    const { lang, admin } = req.query;
    const announcements = await Announcement.find().sort({ date: -1 });

    if (admin === 'true') {
      res.status(200).json({ success: true, announcements });
      return;
    }

    const transformedAnnouncements = announcements.map(announcement => ({
      _id: announcement._id,
      title: lang === 'kn' ? announcement.title_k : announcement.title,
      message: lang === 'kn' ? announcement.message_k : announcement.message,
      link: announcement.link,
      mediaUrl: announcement.mediaUrl,
      mediaType: announcement.mediaType,
      mediaPublicId: announcement.mediaPublicId,
      date: announcement.date,
      createdAt: announcement.createdAt,
      updatedAt: announcement.updatedAt
    }));

    res.status(200).json({ success: true, announcements: transformedAnnouncements });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ADD a new announcement
export const addAnnouncement = async (req, res) => {
  try {
    const { title, title_k, message, message_k, link } = req.body;

    if (!title || !title_k || !message || !message_k) {
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
      title_k,
      message,
      message_k,
      link,
      mediaUrl,
      mediaType,
      mediaPublicId,
      date: req.body.date ? new Date(req.body.date) : new Date(),
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
    const { title, title_k, message, message_k, link } = req.body;


    let updateData = { title, title_k, message, message_k, link };

    if (req.body.date) {
      updateData.date = new Date(req.body.date);
    }

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
