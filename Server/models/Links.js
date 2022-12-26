import mongoose from "mongoose";
const Schema = mongoose.Schema;

const linkSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Links || mongoose.model("Links", linkSchema);
