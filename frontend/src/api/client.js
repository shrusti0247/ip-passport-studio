import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Later we will attach token here if needed
// api.interceptors.request.use((config) => { ... });

export default api;
