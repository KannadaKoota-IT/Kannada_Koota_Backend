// backend/models/event_model.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
