// frontend/src/components/Navbar.js
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userEmail = auth?.user?.email;

  return (
    <header className="navbar">
      <div className="nav-brand">
        <Link to="/">IP Passport Studio</Link>
      </div>

      <div className="nav-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>

        <NavLink to="/dashboard" className="nav-link">
          Dashboard
        </NavLink>

        <span className="nav-status">
          {isAuthenticated
            ? userEmail
              ? `Logged in as ${userEmail}`
              : "Logged in"
            : "Guest"}
        </span>

        {isAuthenticated ? (
          <button className="nav-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <NavLink to="/login" className="nav-button nav-link nav-button-link">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Navbar;
