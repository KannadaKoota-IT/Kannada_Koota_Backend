import Contact from "../models/contact_model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Contact.create({ name, email, message });
    await sendEmail({ name, email, message });

    res.status(200).json({ success: true, msg: "Message sent successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error." });
  }
};
