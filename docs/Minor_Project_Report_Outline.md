## 📅 Day-wise Work Progress

### Day 1 – Project Setup & Documentation

- Understood the complete project concept: IP Passport Studio.
- Learned basic terms: Intellectual Property, hash, fingerprint, IPFS, on-chain.
- Created GitHub repository and initial folder structure.
- Added README.md to the root directory.
- Created documentation folder with:
  - SRS_IP_Passport_Studio.docx (Word file for college submission)
  - Minor_Project_Report_Outline.md (Markdown for GitHub documentation)
- Made the first commit and push to GitHub.

### Day 2 – Backend Initialization

- Initialized Node.js project in `backend` folder using:
    `npm init -y`

- Installed essential backend dependencies:
- express
- cors
- dotenv
- nodemon (development)
- Created `server.js` and configured an Express server.
- Added a test route (`GET /`) returning:
    `IP Passport backend is running ✅`

- Created `.env` to store environment variables (PORT=5000)
- Confirmed server runs successfully at:
    `http://localhost:5000/`

- Updated documentation and pushed progress to GitHub.

### Day 3 – Database Setup and User Model

- Installed and configured MongoDB connection using Mongoose in the backend.
- Added `MONGO_URI` to `.env` and created a reusable `connectDB` function in `config/db.js`.
- Updated `server.js` to connect to MongoDB before starting the server.
- Designed and implemented the initial `User` model (`User.js`) with fields:
  - name
  - email
  - passwordHash
  - timestamps (createdAt, updatedAt)
- Created a temporary `/test-user` route to verify that users can be created and stored in the MongoDB database.



