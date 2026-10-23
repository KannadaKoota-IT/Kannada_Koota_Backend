// backend/controllers/wordOfDayController.js
import WordOfDay from "../models/wordofday_model.js";

// GET all words (admin listing + widget carousel)
export const getAllWords = async (req, res) => {
  try {
    const words = await WordOfDay.find().sort({ date: -1 });
    res.status(200).json(words);
  } catch (err) {
    console.error("Failed to fetch words:", err);
    res.status(500).json({ error: "Failed to fetch words" });
  }
};

// GET today's word (public widget endpoint)
export const getTodayWord = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let word = await WordOfDay.findOne({
      isActive: true,
      date: { $gte: today, $lt: tomorrow },
    });

    // Fallback: most recent active word whose date has passed
    if (!word) {
      word = await WordOfDay.findOne({
        isActive: true,
        date: { $lte: today },
      }).sort({ date: -1 });
    }

    // Final fallback: any active word
    if (!word) {
      word = await WordOfDay.findOne({ isActive: true }).sort({ date: -1 });
    }

    if (!word) {
      return res.status(404).json({ error: "No word of the day found" });
    }

    res.status(200).json(word);
  } catch (err) {
    console.error("Failed to fetch today's word:", err);
    res.status(500).json({ error: "Failed to fetch today's word" });
  }
};

// CREATE a new word (admin-only)
export const createWord = async (req, res) => {
  const {
    wordKannada,
    transliteration,
    partOfSpeech,
    meaningEnglish,
    exampleSentenceKannada,
    exampleSentenceEnglish,
    date,
    isActive,
  } = req.body;

  if (!wordKannada || !transliteration || !partOfSpeech || !meaningEnglish || !date) {
    return res.status(400).json({ error: "Word, transliteration, part of speech, meaning and date are required" });
  }

  try {
    const newWord = new WordOfDay({
      wordKannada,
      transliteration,
      partOfSpeech,
      meaningEnglish,
      exampleSentenceKannada: exampleSentenceKannada || "",
      exampleSentenceEnglish: exampleSentenceEnglish || "",
      date,
      isActive: isActive !== undefined ? isActive : true,
    });
    await newWord.save();
    res.status(201).json(newWord);
  } catch (err) {
    console.error("Failed to create word:", err);
    res.status(500).json({ error: "Failed to create word" });
  }
};

// UPDATE a word (admin-only)
export const updateWord = async (req, res) => {
  const { id } = req.params;
  const {
    wordKannada,
    transliteration,
    partOfSpeech,
    meaningEnglish,
    exampleSentenceKannada,
    exampleSentenceEnglish,
    date,
    isActive,
  } = req.body;

  const updates = {};
  if (wordKannada !== undefined) updates.wordKannada = wordKannada;
  if (transliteration !== undefined) updates.transliteration = transliteration;
  if (partOfSpeech !== undefined) updates.partOfSpeech = partOfSpeech;
  if (meaningEnglish !== undefined) updates.meaningEnglish = meaningEnglish;
  if (exampleSentenceKannada !== undefined) updates.exampleSentenceKannada = exampleSentenceKannada;
  if (exampleSentenceEnglish !== undefined) updates.exampleSentenceEnglish = exampleSentenceEnglish;
  if (date !== undefined) updates.date = date;
  if (isActive !== undefined) updates.isActive = isActive;

  try {
    const updated = await WordOfDay.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Word not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Failed to update word:", err);
    res.status(500).json({ error: "Failed to update word" });
  }
};

// DELETE a word (admin-only)
export const deleteWord = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await WordOfDay.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Word not found" });
    }

    res.status(200).json({ message: "Word deleted successfully" });
  } catch (err) {
    console.error("Failed to delete word:", err);
    res.status(500).json({ error: "Failed to delete word" });
  }
};
