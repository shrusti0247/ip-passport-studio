const express = require("express");
const Passport = require("../models/Passport");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ---------- Multer config for file uploads ----------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads")); // backend/uploads
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ---------- Create passport WITHOUT file (optional old route) ----------
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, assetType } = req.body;

    if (!title || !assetType) {
      return res
        .status(400)
        .json({ message: "Title and assetType are required" });
    }

    const hash = crypto.randomBytes(20).toString("hex");

    const passport = await Passport.create({
      title,
      description,
      assetType,
      hash,
      owner: req.user.id, // from token
    });

    return res.status(201).json({
      message: "IP Passport created successfully",
      passport,
    });
  } catch (error) {
    console.error("Error creating passport:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// ---------- Upload file + create passport ----------
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, description, assetType } = req.body;

      if (!title || !assetType) {
        return res.status(400).json({
          message: "Title and assetType are required",
        });
      }

      if (!req.file) {
        return res.status(400).json({ message: "File is required" });
      }

      const filePath = req.file.path;

      // Generate hash of file contents
      const buffer = fs.readFileSync(filePath);
      const hash = crypto.createHash("sha256").update(buffer).digest("hex");

      const passport = await Passport.create({
        title,
        description,
        assetType,
        hash,
        filePath,
        owner: req.user.id, // from token
      });

      return res.status(201).json({
        message: "IP Passport created successfully with file upload",
        passport,
      });
    } catch (error) {
      console.error("Error uploading passport:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

// ---------- Get all passports for CURRENT user ----------
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const passports = await Passport.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Passports fetched successfully for current user",
      passports,
    });
  } catch (error) {
    console.error("Error fetching passports:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// ---------- Get single passport by ID ----------
router.get("/:passportId", authMiddleware, async (req, res) => {
  try {
    const { passportId } = req.params;

    const passport = await Passport.findOne({
      _id: passportId,
      owner: req.user.id,
    });

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

// ---------- Delete passport by ID ----------
router.delete("/:passportId", authMiddleware, async (req, res) => {
  try {
    const { passportId } = req.params;

    const passport = await Passport.findOneAndDelete({
      _id: passportId,
      owner: req.user.id,
    });

    if (!passport) {
      return res.status(404).json({ message: "Passport not found" });
    }

    // Optional: delete the file from disk if it exists
    if (passport.filePath && fs.existsSync(passport.filePath)) {
      fs.unlinkSync(passport.filePath);
    }

    return res.status(200).json({
      message: "Passport deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting passport:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
