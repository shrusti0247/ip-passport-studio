import React from "react";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h2>Dashboard</h2>
      {user && <p>Welcome, <strong>{user.name}</strong> 👋</p>}
      <p>
        Here we will show your IP Passports, uploads, and other data fetched
        from the backend.
      </p>
    </div>
  );
}

export default Dashboard;
