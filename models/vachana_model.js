// backend/models/vachana_model.js
import mongoose from "mongoose";

const vachanaSchema = new mongoose.Schema(
  {
    titleKannada: {
      type: String,
      required: [true, "Kannada title is required"],
    },
    titleEnglish: {
      type: String,
      required: [true, "English title is required"],
    },
    authorKannada: {
      type: String,
      required: [true, "Kannada author name is required"],
    },
    authorEnglish: {
      type: String,
      required: [true, "English author name is required"],
    },
    originalVerses: {
      type: [String],
      required: [true, "Original verses are required"],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "At least one verse line is required",
      },
    },
    englishTranslation: {
      type: [String],
      default: [],
    },
    date: {
      type: Date,
      required: [true, "Scheduled date is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient "today" lookup
vachanaSchema.index({ date: -1, isActive: 1 });

const Vachana = mongoose.model("Vachana", vachanaSchema);
export default Vachana;
