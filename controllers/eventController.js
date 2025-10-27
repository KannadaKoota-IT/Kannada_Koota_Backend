// backend/controllers/eventController.js
import Event from "../models/event_model.js";

// GET all events
export const getAllEvents = async (req, res) => {
  try {
        const lang = (req.query.lang || 'en').toLowerCase();
        const isAdmin = req.query.admin === 'true';
    // Prevent caches from serving the wrong language
    res.set('Cache-Control', 'no-store');
    res.set('Vary', 'Accept-Language, Origin');
    const events = await Event.find().sort({ date: -1 });

    // If admin request, return full bilingual data
    if (isAdmin) {
      const adminEvents = events.map(event => ({
        _id: event._id,
        title: event.title,
        title_k: event.title_k,
        description: event.description,
        description_k: event.description_k,
        date: event.date,
        eventTime: event.eventTime,
        imageUrl: event.imageUrl,
        location: event.location,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt
      }));
      return res.status(200).json(adminEvents);
    }

    const transformedEvents = events.map(event => ({
      _id: event._id,
      title: lang === 'kn' ? event.title_k : event.title,
      description: lang === 'kn' ? event.description_k : event.description,
      date: event.date,
      eventTime: event.eventTime,
      imageUrl: event.imageUrl,
      location: event.location,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    }));

    res.status(200).json(transformedEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// CREATE new event (with image upload)
export const createEvent = async (req, res) => {
  const { title, title_k, description, description_k, date, eventTime, location } = req.body;
  const imageUrl = req.file ? req.file.path : "";

  if (!title || !title_k || !description || !description_k || !date) {
    return res.status(400).json({ error: "Title, description, and date are required" });
  }

  try {
    const newEvent = new Event({ title, title_k, description, description_k, date, eventTime, location, imageUrl });
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
  const { title, title_k, description, description_k, date, eventTime, location } = req.body;


  const updates = { title, title_k, description, description_k, date, eventTime, location };

  if (req.file) {
    updates.imageUrl = req.file.path;
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
