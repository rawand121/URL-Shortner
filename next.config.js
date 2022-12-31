const nextConfig = {
  reactStrictMode: false,

  env: {
    NEXTAUTH_SECRET: "Rawand123",
    MONGODB_URI:
      "mongodb+srv://My1stDB:Messi2011@cluster0.er8jm.mongodb.net/url-shortner?retryWrites=true&w=majority",
  },

  async rewrites() {
    return [
      {
        source: "/visitPage",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
