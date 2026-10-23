// backend/controllers/vachanaController.js
import Vachana from "../models/vachana_model.js";

// GET all vachanas (admin listing + widget carousel)
export const getAllVachanas = async (req, res) => {
  try {
    const vachanas = await Vachana.find().sort({ date: -1 });
    res.status(200).json(vachanas);
  } catch (err) {
    console.error("Failed to fetch vachanas:", err);
    res.status(500).json({ error: "Failed to fetch vachanas" });
  }
};

// GET today's vachana (public widget endpoint)
export const getTodayVachana = async (req, res) => {
  try {
    // Find the vachana scheduled for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let vachana = await Vachana.findOne({
      isActive: true,
      date: { $gte: today, $lt: tomorrow },
    });

    // Fallback: most recent active vachana whose date has passed
    if (!vachana) {
      vachana = await Vachana.findOne({
        isActive: true,
        date: { $lte: today },
      }).sort({ date: -1 });
    }

    // Final fallback: any active vachana
    if (!vachana) {
      vachana = await Vachana.findOne({ isActive: true }).sort({ date: -1 });
    }

    if (!vachana) {
      return res.status(404).json({ error: "No vachana found" });
    }

    res.status(200).json(vachana);
  } catch (err) {
    console.error("Failed to fetch today's vachana:", err);
    res.status(500).json({ error: "Failed to fetch today's vachana" });
  }
};

// CREATE a new vachana (admin-only)
export const createVachana = async (req, res) => {
  const {
    titleKannada,
    titleEnglish,
    authorKannada,
    authorEnglish,
    originalVerses,
    englishTranslation,
    date,
    isActive,
  } = req.body;

  if (!titleKannada || !titleEnglish || !authorKannada || !authorEnglish || !date) {
    return res.status(400).json({ error: "Title, author and date fields are required" });
  }

  // Accept verses as newline-separated string or array
  const versesArray = Array.isArray(originalVerses)
    ? originalVerses
    : typeof originalVerses === "string"
      ? originalVerses.split("\n").filter((v) => v.trim())
      : [];

  const translationArray = Array.isArray(englishTranslation)
    ? englishTranslation
    : typeof englishTranslation === "string"
      ? englishTranslation.split("\n").filter((v) => v.trim())
      : [];

  if (versesArray.length === 0) {
    return res.status(400).json({ error: "At least one verse line is required" });
  }

  try {
    const newVachana = new Vachana({
      titleKannada,
      titleEnglish,
      authorKannada,
      authorEnglish,
      originalVerses: versesArray,
      englishTranslation: translationArray,
      date,
      isActive: isActive !== undefined ? isActive : true,
    });
    await newVachana.save();
    res.status(201).json(newVachana);
  } catch (err) {
    console.error("Failed to create vachana:", err);
    res.status(500).json({ error: "Failed to create vachana" });
  }
};

// UPDATE a vachana (admin-only)
export const updateVachana = async (req, res) => {
  const { id } = req.params;
  const {
    titleKannada,
    titleEnglish,
    authorKannada,
    authorEnglish,
    originalVerses,
    englishTranslation,
    date,
    isActive,
  } = req.body;

  const updates = {};
  if (titleKannada !== undefined) updates.titleKannada = titleKannada;
  if (titleEnglish !== undefined) updates.titleEnglish = titleEnglish;
  if (authorKannada !== undefined) updates.authorKannada = authorKannada;
  if (authorEnglish !== undefined) updates.authorEnglish = authorEnglish;
  if (date !== undefined) updates.date = date;
  if (isActive !== undefined) updates.isActive = isActive;

  if (originalVerses !== undefined) {
    updates.originalVerses = Array.isArray(originalVerses)
      ? originalVerses
      : typeof originalVerses === "string"
        ? originalVerses.split("\n").filter((v) => v.trim())
        : [];
  }

  if (englishTranslation !== undefined) {
    updates.englishTranslation = Array.isArray(englishTranslation)
      ? englishTranslation
      : typeof englishTranslation === "string"
        ? englishTranslation.split("\n").filter((v) => v.trim())
        : [];
  }

  try {
    const updated = await Vachana.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Vachana not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Failed to update vachana:", err);
    res.status(500).json({ error: "Failed to update vachana" });
  }
};

// DELETE a vachana (admin-only)
export const deleteVachana = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Vachana.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Vachana not found" });
    }

    res.status(200).json({ message: "Vachana deleted successfully" });
  } catch (err) {
    console.error("Failed to delete vachana:", err);
    res.status(500).json({ error: "Failed to delete vachana" });
  }
};
