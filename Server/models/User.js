import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "ئیمەیڵەکە لە کاردایە تکایە ئیمەیڵێکی تر بەکاربهێنە"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  username: {
    type: String,
    required: true,
  },
  links: [
    {
      type: Schema.Types.ObjectId,
      ref: "Links",
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.Users || mongoose.model("Users", userSchema);
