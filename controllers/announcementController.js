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
  const { title, message} = req.body;

  if (!title || !message) {
    return res.status(400).json({ success: false, message: "Title and message are required" });
  }

  try {
    const newAnnouncement = new Announcement({ title, message });
    await newAnnouncement.save();
    res.status(201).json({ success: true, announcement: newAnnouncement });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE announcement
export const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, message } = req.body;

  try {
    const updated = await Announcement.findByIdAndUpdate(
      id,
      { title, message},
      { new: true }
    );
    res.status(200).json({ success: true, announcement: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

// DELETE announcement
export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    await Announcement.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Announcement deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};
