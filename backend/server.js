const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const path = require("path");
const express = require("express");

const User = require("./models/User"); 

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

const port = 4000;

async function createAdminIfNotExists() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) return;

    const existingAdmin = await User.findOne({ email: adminEmail, role: "admin" });
    if (existingAdmin) return;

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log("Admin created");
  } catch (err) {
    console.log("Admin creation error:", err.message);
  }
}

mongoose
  .connect(process.env.mongourl)
  .then(async () => {
    console.log("DB connected successfully");
    await createAdminIfNotExists();
  })
  .catch((err) => console.log("DB connection error:", err));


// Routes
app.use("/auth", require("./Routes/authRoutes"));
app.use("/item", require("./Routes/ItemRoutes"));
app.use("/feedback", require("./Routes/FeedbackRoutes"));

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Show uploaded images

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
