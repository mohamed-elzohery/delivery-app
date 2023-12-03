import mongoose, { Connection, MongooseError } from "mongoose";
import "colors";

// Read dummy data from JSON
const BIKERS = require("../data/bikers.json");
const SENDERS = require("../data/senders.json");

// Importing models
import BikerModel from "../models/Biker";
import SenderModel from "../models/Sender";

// Pushing data to db
const pushJsonData = async (data: any[], collection: any) => {
  for (const doc of data) {
    const newEntry = new collection(doc);
    console.log(newEntry);
    await newEntry.save().catch(console.log);
  }
};

// Delete all hard-coded data
const deleteAllModelData = async (collection: any) => {
  await collection.deleteMany({});
};

const addAllData = async () => {
  try {
    await pushJsonData(BIKERS, BikerModel);
    await pushJsonData(SENDERS, SenderModel);
    console.log("all hard-coded data is added".bgBlue.white);
  } catch (err) {
    console.log(`Error while seeding data ${err}`);
    process.exit(1);
  }
};

const removeAllData = async () => {
  try {
    await deleteAllModelData(BikerModel);
    await deleteAllModelData(SenderModel);
    console.log("all hard-coded data is deleted".bgGreen.white);
  } catch (err) {
    console.log(
      `Error while deleting data ${(err as MongooseError).message}`.bgRed.white
    );
    process.exit(1);
  }
};

(async () => {
  const operation = process.argv[2];
  try {
    if (operation === "i") {
      const connection = await mongoose.connect(
        "mongodb://127.0.0.1:27017/delivery-app"
      );
      await addAllData();
      await connection.disconnect();
    }
    if (operation === "d") {
      const connection = await mongoose.connect(
        "mongodb://127.0.0.1:27017/delivery-app"
      );
      await removeAllData();
      await connection.disconnect();
    }
    process.exit(0);
  } catch (err) {
    console.log((err as MongooseError).message);
    process.exit(1);
  }
})();
