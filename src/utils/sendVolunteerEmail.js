const nodemailer = require("nodemailer");

const sendVolunteerEmail = async (volunteer, idCardUrl) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  });

  const htmlTemplate = `
  <div style="font-family:Arial;padding:20px">
    <h2 style="color:#2563eb">
      Welcome to Helping Hands NGO 🤝
    </h2>

    <p>Hello <b>${volunteer.name}</b>,</p>

    <p>
      🎉 Congratulations! Your volunteer account has been 
      <b style="color:green">ACTIVATED</b>.
    </p>

    <p>
      We are happy to welcome you as an official volunteer.
    </p>

    <h3>Your Volunteer Details</h3>
    <ul>
      <li><b>ID:</b> ${volunteer.volunteerId}</li>
      <li><b>Role:</b> ${volunteer.role || "Volunteer"}</li>
      <li><b>City:</b> ${volunteer.city}</li>
    </ul>

    <p>Your Volunteer ID Card:</p>

    <img src="${idCardUrl}" 
         style="border-radius:10px;
         box-shadow:0 0 10px #ccc"
         width="350"/>

    <p style="margin-top:20px">
      Thank you for making a difference ❤️
    </p>

    <hr/>
    <small>Dhatrutha Team</small>
  </div>
  `;

  await transporter.sendMail({
    from: `"Dhatrutha" <${process.env.EMAIL_USER}>`,
    to: volunteer.email,
    subject: "🎉 Welcome! Your Volunteer Account is Activated",
    html: htmlTemplate,
  });
};

module.exports = sendVolunteerEmail;
