import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In Day 10 we'll call /api/auth/login here
    console.log("Login form submitted:", { email, password });
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <p className="helper-text">
        Use the same email/password you tested earlier in Postman.
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="button" type="submit">
          Login (frontend only for now)
        </button>
      </form>
    </div>
  );
}

export default Login;
