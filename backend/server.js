const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));


const port = 4000;

// MongoDB connection
mongoose.connect(process.env.mongourl)
  .then(() => console.log(" DB connected successfully"))
  .catch((err) => console.log(" DB connection error:", err));

// Import Routes
const authroutes = require("./Routes/authRoutes");

app.use("/feedback", require("./Routes/FeedbackRoute"));

app.use("/item", require("./Routes/ItemRoutes"));
app.use("/auth", authroutes); // all auth routes start with /auth

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
