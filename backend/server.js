const passportRoutes = require("./routes/passportRoutes");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/passport", passportRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("IP Passport backend is running ✅");
});

const User = require("./models/User");

// Choose port from .env or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to DB, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

