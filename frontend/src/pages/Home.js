// frontend/src/pages/Home.js
import React, { useEffect, useState } from "react";
import api from "../api/client";

function Home() {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await api.get("/health");
        if (res.data?.status === "ok") {
          setBackendStatus("Backend is reachable ✅");
        } else {
          setBackendStatus("Backend is not reachable.");
        }
      } catch (err) {
        setBackendStatus("Backend is not reachable. Make sure npm run dev is running in backend.");
      }
    };

    checkBackend();
  }, []);

  return (
    <div>
      <h1>Welcome to IP Passport Studio</h1>
      <p>Backend status: {backendStatus}</p>
    </div>
  );
}

export default Home;
