const nodemailer = require("nodemailer");
const path = require("path");

const sendVolunteerEmail = async (volunteer, idCardUrl) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">

        <img src="cid:bannerImage" 
             style="width:100%; max-height:200px; object-fit:cover; border-radius:10px;" />

        <h2 style="color:#254151; margin-top:20px;">
          Welcome to Dhatrutha 🤝
        </h2>

        <p>Hello <b>${volunteer.name}</b>,</p>

        <p>
          🎉 Congratulations! Your volunteer account has been 
          <b style="color:green;">ACTIVATED</b>.
        </p>

        <p>
          We are proud to welcome you as an official volunteer.
        </p>

        <!-- ✅ Volunteer Details Card -->
        <div style="
          background:#f3f4f6;
          padding:15px;
          border-radius:10px;
          margin-top:15px;
        ">
          <h3 style="margin-top:0;">Your Volunteer Details</h3>
          <ul style="padding-left:20px;">
            <li><strong>ID:</strong> ${volunteer.volunteerId}</li>
            <li><strong>Role:</strong> ${volunteer.role || "Volunteer"}</li>
            <li><strong>City:</strong> ${volunteer.city}</li>
          </ul>
        </div>

        <!-- ✅ ID Card Preview -->
        <p style="margin-top:20px;">Your Volunteer ID Card:</p>

        <img src="${idCardUrl}" 
             style="
               border-radius:10px;
               box-shadow:0 4px 10px rgba(0,0,0,0.1);
               margin-top:10px;
             "
             width="350"/>

        <p style="margin-top:25px;">
          Thank you for making a difference ❤️
        </p>

        <hr style="margin-top:30px;"/>

        <small style="color:gray;">
          Dhatrutha Organization Team
        </small>

      </div>
    `;

    await transporter.sendMail({
      from: `"Dhatrutha Organization" <${process.env.EMAIL_USER}>`,
      to: volunteer.email,
      subject: "🎉 Welcome! Your Volunteer Account is Activated",
      html: htmlTemplate,
      attachments: [
        {
          filename: "email-banner.png",
          path: path.join(__dirname, "../assets/dhatruthaLogo.webp"), 
          cid: "bannerImage",
        },
      ],
    });

    console.log("Volunteer activation email sent successfully");
  } catch (error) {
    console.error("Volunteer email sending failed:", error.message);
  }
};

module.exports = sendVolunteerEmail;