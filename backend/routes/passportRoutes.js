const express = require("express");
const Passport = require("../models/Passport");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


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

// UPLOAD a file and create passport
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, description, assetType, owner } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // generate a real hash of file content
    const fileBuffer = fs.readFileSync(req.file.path);
    const hash = require("crypto").createHash("sha256").update(fileBuffer).digest("hex");

    const passport = await Passport.create({
      title,
      description,
      assetType,
      hash,
      owner,
    });

    return res.status(201).json({
      message: "File uploaded & Passport created successfully",
      passport,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});


// GET ALL PASSPORTS FOR A USER
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const passports = await Passport.find({ owner: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Passports fetched successfully",
      passports,
    });
  } catch (error) {
    console.error("Error fetching passports:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET A SINGLE PASSPORT BY ID
router.get("/:passportId", async (req, res) => {
  try {
    const { passportId } = req.params;

    const passport = await Passport.findById(passportId).populate("owner", "name email");

    if (!passport) {
      return res.status(404).json({ message: "Passport not found" });
    }

    return res.status(200).json({
      message: "Passport fetched successfully",
      passport,
    });
  } catch (error) {
    console.error("Error fetching passport:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// DELETE A PASSPORT BY ID
router.delete("/:passportId", async (req, res) => {
  try {
    const { passportId } = req.params;

    const deleted = await Passport.findByIdAndDelete(passportId);

    if (!deleted) {
      return res.status(404).json({ message: "Passport not found" });
    }

    return res.status(200).json({ message: "Passport deleted successfully" });
  } catch (error) {
    console.error("Error deleting passport:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

