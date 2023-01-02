import axios from "axios";

const config = axios.create({
  // baseURL: "https://url-shortner-neon.vercel.app",
  baseURL: "http://localhost:3000",
});

export default config;
