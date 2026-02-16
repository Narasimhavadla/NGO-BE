const nodemailer = require("nodemailer");

const sendVolunteerEmail = async (
  volunteer,
  idCardUrl
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: volunteer.email,
    subject:
      "🎉 Congratulations – You Are Now Active!",
    html: `
      <h2>Hello ${volunteer.name}</h2>

      <p>
        Congratulations 🎉 <br/>
        Your volunteer status is now <b>ACTIVE</b>.
      </p>

      <p>
        Please find your Volunteer ID Card below.
      </p>

      <img src="${idCardUrl}" width="320"/>

      <p>Thank you for supporting our NGO ❤️</p>
    `,
  });
};

module.exports = sendVolunteerEmail;
