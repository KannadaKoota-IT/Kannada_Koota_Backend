// controllers/teamController.js
import TeamMember from "../models/teamMember_model.js";

// ✅ Get all team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch team members." });
  }
};

// ✅ Add team member with image upload
export const addTeamMember = async (req, res) => {
  console.log("🧾 BODY:", req.body);
  console.log("🖼️ FILE:", req.file);

  const { name, role } = req.body;
  const photoUrl = req.file ? `/uploads/teams/${req.file.filename}` : "";

  if (!name || !role || !req.file) {
    return res.status(400).json({ error: "Name, role, and photo are required." });
  }

  try {
    const newMember = new TeamMember({ name, role, photoUrl });
    await newMember.save();
    res.status(201).json({ message: "Team member added", member: newMember });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add team member." });
  }
};

// ✅ Update team member
export const updateTeamMember = async (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;
  const updates = { name, role };

  if (req.file) {
    updates.photoUrl = `/uploads/teams/${req.file.filename}`;
  }

  try {
    const updated = await TeamMember.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Member not found" });

    res.status(200).json({ message: "Team member updated", member: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update team member." });
  }
};

// ✅ Delete team member
export const deleteTeamMember = async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await TeamMember.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ error: "Member not found" });

    res.status(200).json({ message: "Team member deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete team member." });
  }
};
