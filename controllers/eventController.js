// backend/controllers/eventController.js
import Event from "../models/event_model.js";

// GET all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// CREATE new event (with image upload)
export const createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

  if (!title || !description || !date) {
    return res.status(400).json({ error: "Title, description, and date are required" });
  }

  try {
    const newEvent = new Event({ title, description, date, location, imageUrl });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create event" });
  }
};

// UPDATE event (optional new image)
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location } = req.body;

  const updates = { title, description, date, location };

  if (req.file) {
    updates.imageUrl = `/uploads/${req.file.filename}`;
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update event" });
  }
};

// DELETE event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};
