import React, { useEffect, useState } from "react";
import api from "../api/client";

function Home() {
  const [status, setStatus] = useState("Checking backend...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkBackend() {
      try {
        const res = await api.get("/"); // this hits: http://localhost:5000/
        setStatus(res.data); // "IP Passport backend is running ✅"
      } catch (err) {
        console.error(err);
        setStatus("Backend is not reachable. Make sure npm run dev is running in backend.");
      } finally {
        setLoading(false);
      }
    }

    checkBackend();
  }, []);

  return (
    <div className="card">
      <h2>Welcome to IP Passport Studio</h2>
      <p className="helper-text">
        This app lets you register digital content and generate IP Passports.
      </p>

      <div style={{ marginTop: "1rem" }}>
        <strong>Backend status: </strong>
        <span className={status.includes("running") ? "status-ok" : "status-error"}>
          {loading ? "Checking..." : status}
        </span>
      </div>
    </div>
  );
}

export default Home;
