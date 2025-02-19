const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Ensure this path is correct

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/CodeReviewAI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Function to update passwords
const updatePasswords = async () => {
  try {
    const users = await User.find(); // Get all users
    for (let user of users) {
      if (!user.password.startsWith("$2b$")) { // Only hash if not already hashed
        console.log(`🔄 Hashing password for: ${user.name}`);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        console.log(`✅ Updated password for: ${user.name}`);
      }
    }
    console.log("🎉 Password update complete!");
  } catch (error) {
    console.error("❌ Error updating passwords:", error);
  } finally {
    mongoose.connection.close(); // Close DB connection after execution
  }
};

// Run the update
updatePasswords();
