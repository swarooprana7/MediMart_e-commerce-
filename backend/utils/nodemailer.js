import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., Gmail, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USERNAME, // your email address
    pass: process.env.EMAIL_PASSWORD, // your email password
  },
});

export default transporter;
