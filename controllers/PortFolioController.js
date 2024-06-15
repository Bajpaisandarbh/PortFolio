const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail email address
    pass: process.env.GMAIL_PASS, // Your regular Gmail password
  },
});

const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "bajpaisandarbh@gmail.com", // Replace with recipient email address
      subject: "Regarding Mern Portfolio App",
      html: `
        <h5>Detail information</h5>
        <ul>
          <li><p>Name: ${name}</p></li>
          <li><p>Email: ${email}</p></li>
          <li><p>Message: ${msg}</p></li>
        </ul>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(200).send({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({
      success: false,
      message: "Failed to send email.",
    });
  }
};

module.exports = { sendEmailController };
