const mongoose = require("mongoose");

const passportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    assetType: {
      type: String,
      enum: ["image", "video", "audio", "text"],
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    filePath: {
      type: String, // where the uploaded file is stored
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("Passport", passportSchema);


