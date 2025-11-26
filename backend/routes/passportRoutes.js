const express = require("express");
const Passport = require("../models/Passport");
const crypto = require("crypto");

const router = express.Router();

// CREATE A PASSPORT
router.post("/create", async (req, res) => {
  try {
    const { title, description, assetType, owner } = req.body;

    if (!title || !assetType || !owner) {
      return res.status(400).json({
        message: "Title, assetType, and owner are required",
      });
    }

    // Generate a random hash for now (will replace with real file hashing later)
    const hash = crypto.randomBytes(20).toString("hex");

    const passport = await Passport.create({
      title,
      description,
      assetType,
      hash,
      owner,
    });

    return res.status(201).json({
      message: "IP Passport created successfully",
      passport,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
