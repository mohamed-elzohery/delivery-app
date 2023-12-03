import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/v1/auth";
import ErrorHandler from "./middlewares/errorHandler";

const app = express();
process.env.NODE_ENV !== "production" && app.use(morgan("dev"));

dotenv.config({
  path: path.resolve(__dirname + `/config/${process.env.NODE_ENV}.env`),
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", AuthRouter);

app.all("*", (req, res) =>
  res.status(404).json({ message: "Undefinded Routes" })
);
app.use(ErrorHandler);

export default app;
