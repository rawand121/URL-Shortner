import axios from "axios";

const config = axios.create({
  baseURL: "https://url-shortner-neon.vercel.app",
});

export default config;
