const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  console.log(`hi from mailer`);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_APIKEY,
      pass: process.env.EMAIL_SECRET,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Suyesh Badge <suyeshbadge@protonmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
