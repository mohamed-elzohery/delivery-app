import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/v1/auth";
import ErrorHandler from "./middlewares/errorHandler";
import ParcelsRouter from "./routes/v1/parcels";

const app = express();
process.env.NODE_ENV !== "production" && app.use(morgan("dev"));

dotenv.config({
  path: path.resolve(__dirname + `/config/${process.env.NODE_ENV}.env`),
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/parcels", ParcelsRouter);

app.all("*", (req, res) =>
  res.status(404).json({ message: "Undefinded Routes" })
);
app.use(ErrorHandler);

export default app;
