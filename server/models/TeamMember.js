import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,

      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    },
    role: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "El rol debe tener al menos 2 caracteres"],
    },
    bio: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
    },
    socialLinks: {
      linkedin: String,
      twitter: String,
      facebook: String,
      instagram: String,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;