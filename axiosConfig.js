import axios from "axios";

const config = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://url-shortner-rr1.vercel.app/",
});

export default config;
