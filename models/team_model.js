import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String},
    image_url: { type: String },
    role: {
      type: String,
      enum: ["head", "member"],
      required: true,
    },
  },
  { timestamps: true }
);

const teamSchema = new mongoose.Schema(
  {
    team_name: { type: String, required: true },
    team_photo: { type: String, required: true },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);
const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

export { Team, TeamMember };
