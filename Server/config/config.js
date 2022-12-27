import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDatabase = async () => {
  try {
    dotenv.config();
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected To Database");
  } catch (err) {
    console.log(err);
  }
};

export default connectDatabase;
