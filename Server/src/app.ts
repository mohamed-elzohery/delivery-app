import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();
process.env.NODE_ENV !== "production" && app.use(morgan("dev"));

console.log(`/config/${process.env.NODE_ENV}.env`);
dotenv.config({
  path: path.resolve(__dirname + `/config/${process.env.NODE_ENV}.env`),
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.all("*", (req, res) =>
  res.status(404).json({ message: "Undefinded Routes" })
);

export default app;
