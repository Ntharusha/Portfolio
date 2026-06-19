import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 2000,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err.message));

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contact data schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// Project data schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  imageUrl: { type: String },
  projectUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);

// Routes
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Portfolio Backend API is running..." });
});

// Projects Routes
app.get("/api/projects", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.warn("MongoDB is not connected. Returning empty project list.");
      return res.json([]);
    }
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Fetch projects error:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

app.post("/api/projects", async (req, res) => {
  const { title, category, description } = req.body;
  if (!title || !category || !description) {
    return res.status(400).json({ message: "Missing required fields: title, category, description" });
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database is offline. Cannot create project." });
    }
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(400).json({ message: "Failed to create project" });
  }
});

// Contact Routes
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let savedToDb = false;
    // Save to database only if connected
    if (mongoose.connection.readyState === 1) {
      const newContact = new Contact({ name, email, subject, message });
      await newContact.save();
      savedToDb = true;
    } else {
      console.warn("MongoDB is not connected. Skipping contact database save.");
    }

    // Check if email config is present and not placeholders before sending
    const hasValidEmailConfig = 
      process.env.EMAIL_USER && 
      process.env.EMAIL_PASS && 
      !process.env.EMAIL_USER.includes("your-email") && 
      !process.env.EMAIL_PASS.includes("your-app-password");

    if (hasValidEmailConfig) {
      try {
        // Send email notification
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
          subject: `New Contact Form Submission: ${subject}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #333;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
                <strong>Message:</strong><br/>
                ${message.replace(/\n/g, '<br/>')}
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailErr: any) {
        console.error("Failed to send email notification:", emailErr.message);
      }
    } else {
      console.warn("Email configuration missing or using placeholder values. Message not sent via email.");
    }

    res.status(201).json({ 
      success: true, 
      message: savedToDb 
        ? "Message received and saved successfully!" 
        : "Message received successfully! (Database offline)" 
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ message: "Failed to process message. Please try again later." });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 MongoDB URI: ${MONGODB_URI.substring(0, 15)}...`);
});

