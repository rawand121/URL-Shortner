const nextConfig = {
  reactStrictMode: false,

  env: {
    JWT_SECRET: "Rawand123",
    MONGO_URI:
      "mongodb+srv://My1stDB:Messi2011@cluster0.er8jm.mongodb.net/url-shortner?retryWrites=true&w=majority",
    development: "production",
  },
};

module.exports = nextConfig;
