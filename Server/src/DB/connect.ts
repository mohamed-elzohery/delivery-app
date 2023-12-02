import mongoose from "mongoose";
const { MONGO_URI } = process.env;
const connectDB = async (uri = MONGO_URI) => {
  try {
    await mongoose.connect(uri as string);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error in connection with database", err);
  }
};

export default connectDB;
