const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const path = require("path");
const express = require("express");

// ❗ FIXED — correct import (no destructuring)
const User = require("./models/User"); 

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));


const port = 4000;

// 🔐 Auto-create admin if it doesn't exist
async function createAdminIfNotExists() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log("⚠️ ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
      return;
    }

    const existingAdmin = await User.findOne({ email: adminEmail, role: "admin" });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin user created with hashed password");
  } catch (err) {
    console.log("❌ Error creating admin:", err.message);
  }
}

// MongoDB connection
mongoose.connect(process.env.mongourl)
  .then(() => console.log(" DB connected successfully"))
mongoose
  .connect(process.env.mongourl)
  .then(async () => {
    console.log(" DB connected successfully");
    await createAdminIfNotExists();
  })
  .catch((err) => console.log(" DB connection error:", err));

// Import Routes
const authroutes = require("./Routes/authRoutes");

app.use("/feedback", require("./Routes/FeedbackRoute"));

app.use("/item", require("./Routes/ItemRoutes"));
app.use("/auth", authroutes); // all auth routes start with /auth
app.use("/auth", require("./Routes/authRoutes"));

// serve image uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});