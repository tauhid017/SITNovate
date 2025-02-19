const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const User = require("./models/User"); // Import User model

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/CodeReviewAI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 🔹 Register New User API
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation: Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: "❌ All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "❌ Email already in use" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save User
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation: Check if fields are empty
    if (!email || !password) {
      return res.status(400).json({ error: "❌ Email and Password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "❌ User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "❌ Invalid credentials" });

    // Hide password before sending user details
    const { password: _, ...userData } = user._doc;

    res.status(200).json({ message: "✅ Login successful", user: userData });
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
