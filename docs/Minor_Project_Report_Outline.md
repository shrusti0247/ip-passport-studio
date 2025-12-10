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

### Day 4 – User Authentication (Register & Login)

- Created a dedicated `routes/authRoutes.js` file for authentication endpoints.
- Added two main API routes under `/api/auth`:
  - `POST /api/auth/register` – for new user registration.
  - `POST /api/auth/login` – for user login.
- Implemented server-side validation for required fields (name, email, password).
- Integrated the `User` model with MongoDB using Mongoose.
- Used `bcrypt` to hash passwords before saving them in the database.
- Implemented login logic to:
  - Find user by email.
  - Compare provided password with the stored hashed password.
  - Return a success response (and token structure for future protected routes).
- Tested both routes using Thunder Client:
  - Register request with JSON body (name, email, password) successfully created a user.
  - Login request with same email and password returned a success message.
- Verified user record creation in MongoDB Atlas under the `users` collection.

### Day 5 – IP Passport Model & Creation API

- Designed the `Passport` model with fields such as title, description, assetType, hash, and owner.
- Implemented `passportRoutes.js` with a `POST /api/passport/create` route.
- Added input validation and secure, unique hash generation using the `crypto` library.
- Linked each IP Passport to a User via `owner` (ObjectId reference).
- Integrated passport routes in `server.js` under `/api/passport`.
- Successfully tested passport creation through Thunder Client and verified new records in MongoDB Atlas.

### Day 6 – IP Passport Retrieval & Management APIs

- Extended the `passportRoutes.js` backend routes to support:
  - `GET /api/passport/user/:userId` – fetch all IP Passports for a specific user.
  - `GET /api/passport/:passportId` – fetch detailed information for a single IP Passport, including owner details using Mongoose `populate`.
  - `DELETE /api/passport/:passportId` – delete a specific IP Passport from the database.
- Verified the new APIs using Thunder Client:
  - Successfully retrieved all passports for a test user.
  - Fetched full details for a selected passport.
  - Confirmed deletion and non-existence after deletion.
- These APIs will later be used by the frontend dashboard to show the user’s IP Passports and detail view.

## Day 7 – File Upload & Hashing APIs

- Installed and configured **Multer** in `passportRoutes.js` to enable file uploads.

- Added an `uploads/` directory to store uploaded files locally, and updated `.gitignore` to prevent large files from being committed.

- Implemented a new API route:

  - `POST /api/passport/upload`  
    Handles uploading a file + metadata and automatically creates an IP Passport entry in MongoDB.

- Extended passport creation logic to:
  - Store the uploaded file inside the `uploads/` folder.
  - Generate a **SHA-256 file hash** using Node’s `crypto` and `fs` modules.
  - Save file path + hash + metadata + owner ID inside MongoDB.

- Successfully tested full file upload workflow using **Postman**:
  - Sent form-data request with file + title + description + assetType + owner.
  - Verified new Passport entries in MongoDB Atlas with correct file path & hash.

- This completes the full backend pipeline for **secure file-based IP Passport generation**.

### Day 8 – Auth-Protected IP Passport APIs

- Implemented a reusable JWT-based authentication middleware (`authMiddleware.js`) to protect backend routes.
- Middleware now:
  - Reads the `Authorization: Bearer <token>` header.
  - Verifies the JWT using `JWT_SECRET` from `.env`.
  - Fetches the corresponding user from MongoDB and attaches it to `req.user`.
- Updated `passportRoutes.js` so that:
  - `POST /api/passport/create` and `POST /api/passport/upload` use `auth` and automatically set `owner` from `req.user._id` instead of reading it from the request body.
  - Added a new `GET /api/passport/my` route to fetch all IP Passports belonging to the currently logged-in user.
  - Secured `GET /api/passport/:passportId` and `DELETE /api/passport/:passportId` so that users can only view or delete passports they own.
- Tested all protected routes using Postman by:
  - Logging in via `POST /api/auth/login` to obtain a JWT.
  - Sending the token in the `Authorization: Bearer <token>` header for all passport-related requests.
- With these changes, the backend now enforces user-specific access control for IP Passport creation, retrieval, and deletion.

## Day 9 – Frontend Setup & React Initialization
- Set up the React frontend structure inside the `frontend/` directory.
- Verified that `node_modules` were installed correctly and reinstalled missing dependencies.
- Fixed the issue where `react-scripts` was not recognized by reinstalling it and cleaning the environment.
- Successfully ran the React development server using `npm start`.
- Resolved port conflicts by allowing the app to run on an alternate port.
- Cleaned default React files and ensured the folder structure aligns with the project:
  - `src/pages/` for Home, Login, and Dashboard components.
  - `src/api/client.js` for setting up Axios and backend communication.
  - Updated `App.js` to prepare for routing between pages.
- Confirmed that the frontend is now running correctly in the browser and ready for authentication and dashboard integration.

### Day 10 – Frontend Authentication & Protected Dashboard

- Configured a shared Axios client in `frontend/src/api/client.js` with:
  - `baseURL` pointing to `http://localhost:5000/api`.
  - An interceptor that automatically attaches the `Authorization: Bearer <token>` header when a token exists in `localStorage`.
- Created `frontend/src/api/auth.js` with helper functions for:
  - `login(email, password)` – calls `POST /api/auth/login`.
  - `register(name, email, password)` – prepared for future use.
- Implemented a global authentication context in `frontend/src/context/AuthContext.js`:
  - Stores the logged-in `user` in React state and `localStorage`.
  - Exposes `login()`, `logout()`, `isAuthenticated`, and `loading` to the rest of the app.
  - Restores user session from `localStorage` on page refresh.
- Updated `frontend/src/index.js` to wrap the app in `<AuthProvider>` so all components can access login state.
- Added a reusable `ProtectedRoute` component in `frontend/src/components/ProtectedRoute.js` to:
  - Block access to protected pages when the user is not authenticated.
  - Redirect unauthenticated users to `/login`.
- Built a simple navigation bar in `frontend/src/components/Navbar.js` that:
  - Shows `Home` and `Login` links for guests.
  - Shows “Hi, {user.name}” and a `Logout` button for logged-in users.
- Refactored `App.js` routing to:
  - Define routes for `/` (Home), `/login` (Login), and `/dashboard` (Dashboard).
  - Protect the `/dashboard` route using `<ProtectedRoute>`.
- Updated `Login.js` to connect with the backend:
  - Submits credentials to `POST /api/auth/login` via the new API helper.
  - On success, saves the returned `token` and `user` in the AuthContext and `localStorage`.
  - Redirects the user to `/dashboard` and shows error messages on failure.
- Enhanced `Dashboard.js` to display the logged-in user’s name using the AuthContext.
- Verified end-to-end flow:
  - Backend running with `npm run dev`.
  - Frontend running with `npm start`.
  - Successful login from the React UI, automatic redirect to Dashboard, and proper logout behaviour.



