import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Kannada Koota Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Message from ${name}`,
      text: `
        You received a new message from your contact form:

        Name: ${name}
        Email: ${email}
        Message:
        ${message}
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to send message." });
  }
});

export default router;
