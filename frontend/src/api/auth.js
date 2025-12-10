// frontend/src/api/auth.js
import client from "./client";

export async function loginUser(credentials) {
  // credentials = { email, password }
  const response = await client.post("/auth/login", credentials);
  // backend should return: { message, token, user }
  return response.data;
}

export async function registerUser(data) {
  const response = await client.post("/auth/register", data);
  return response.data;
}
