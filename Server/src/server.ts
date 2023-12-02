import mongoose, { MongooseError } from "mongoose";
import app from "./app";
import connectDB from "./DB/connect";

const PORT = process.env.PORT || "4000";

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log("server is running on port " + PORT));
  } catch (err) {
    console.log("Error on DB Connecting: " + (err as MongooseError).message);
    process.exit(1);
  }
})();
