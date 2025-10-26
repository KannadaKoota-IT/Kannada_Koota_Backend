// controllers/teamController.js
import { Team, TeamMember } from "../models/team_model.js";

// ✅ Add a Team
export const addTeam = async (req, res) => {
  try {
    const { team_name, team_name_k, order } = req.body;
    const team_photo = req.file ? req.file.path : "";

    const newTeam = new Team({ team_name, team_name_k, team_photo, order });
    await newTeam.save();

    res.status(201).json({ success: true, message: "Team created", team: newTeam });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Add a Team Member
export const addTeamMember = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, name_k, email, phone, role } = req.body;
    const image_url = req.file ? req.file.path : "";

    // check if team exists
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ success: false, message: "Team not found" });

    const newMember = new TeamMember({
      team: teamId,
      name,
      name_k,
      email,
      phone,
      image_url,
      role,
    });

    await newMember.save();
    res.status(201).json({ success: true, message: "Member added", member: newMember });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get All Teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ order: 1 });
    res.status(200).json({ success: true, teams });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get All Members of a Team
export const getTeamMembers = async (req, res) => {
  try {
    const { teamId } = req.params;

    // Find team details
    const team = await Team.findById(teamId).select("team_name team_photo");
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }

    // Find all members of the team
    const team_members = await TeamMember.find({ team: teamId });

    const heads = team_members.filter((m) => m.role === "head");
    const members = team_members.filter((m) => m.role === "member");

    res.status(200).json({
      success: true,
      id: teamId,
      team_name: team.team_name,
      team_photo: team.team_photo,
      heads,
      members,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ✅ Update a Member
export const updateTeamMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { name, name_k, email, phone, image_url, role } = req.body;

    const updatedMember = await TeamMember.findByIdAndUpdate(
      memberId,
      { name, name_k, email, phone, image_url, role },
      { new: true }
    );

    if (!updatedMember) return res.status(404).json({ success: false, message: "Member not found" });

    res.status(200).json({ success: true, message: "Member updated", member: updatedMember });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update Team Order
export const updateTeamOrder = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { order } = req.body;

    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { order },
      { new: true }
    );

    if (!updatedTeam) return res.status(404).json({ success: false, message: "Team not found" });

    res.status(200).json({ success: true, message: "Team order updated", team: updatedTeam });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete a Member
export const deleteTeamMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    const deleted = await TeamMember.findByIdAndDelete(memberId);
    if (!deleted) return res.status(404).json({ success: false, message: "Member not found" });

    res.status(200).json({ success: true, message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
