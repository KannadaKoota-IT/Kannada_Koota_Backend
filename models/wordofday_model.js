// backend/models/wordofday_model.js
import mongoose from "mongoose";

const wordOfDaySchema = new mongoose.Schema(
  {
    wordKannada: {
      type: String,
      required: [true, "Kannada word is required"],
    },
    transliteration: {
      type: String,
      required: [true, "Transliteration is required"],
    },
    partOfSpeech: {
      type: String,
      required: [true, "Part of speech is required"],
    },
    meaningEnglish: {
      type: String,
      required: [true, "English meaning is required"],
    },
    exampleSentenceKannada: {
      type: String,
      default: "",
    },
    exampleSentenceEnglish: {
      type: String,
      default: "",
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
wordOfDaySchema.index({ date: -1, isActive: 1 });

const WordOfDay = mongoose.model("WordOfDay", wordOfDaySchema);
export default WordOfDay;
