import mongoose, { MongooseError } from "mongoose";
import app from "./app";

const PORT = process.env.PORT || "4000";

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to database successfully");
    app.listen(PORT, () => console.log("server is running on port " + PORT));
  } catch (err) {
    console.log("Error on DB Connecting: " + (err as MongooseError).message);
    process.exit(1);
  }
})();
