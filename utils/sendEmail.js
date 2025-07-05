import nodemailer from "nodemailer";

export const sendEmail = async ({ name, email, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_RECEIVER,
    subject: `New Message from Kannada Koota`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  await transporter.sendMail(mailOptions);
};
