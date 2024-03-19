import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import logger from "./logging/logger";
import dotenv from "dotenv";
import rateLimit from 'express-rate-limit';
import httpLogger from "./logging/httpLogger";
import { createClient } from "redis";
import createError from "http-errors";
import connect from "./db/connect";

dotenv.config({ path: "./.env" });

const app = express();

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});

redisClient.on("error", (err: any) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis connected successfully"));

// app.use((req: Request, res: Response, next: NextFunction) => {
//   req.redisClient = redisClient;
//   next();
// });

const limiter = rateLimit({
  windowMs: 0.5 * 60 * 1000,  // 15 minutes
  max: 4,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

const urlRouter = require("./route/url");
const userRouter = require("./route/user");
const mainRouter = require("./route/base");

app.use(helmet());
app.use(httpLogger);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", userRouter);
app.use("/api/url", urlRouter);
app.use("/", mainRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError.NotFound());
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  logger.error(err.message);
  res.status(status).json({ status, message });
});

const port = process.env.PORT || 4400;

const start = async () => {
  try {
    await connect(process.env.MONGO_URI || '');
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}...`);
    });
  } catch (err: any) {
    console.log(err);
  }
};

start();
