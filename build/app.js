"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = __importDefault(require("./logging/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const httpLogger_1 = __importDefault(require("./logging/httpLogger"));
const redis_1 = require("redis");
const http_errors_1 = __importDefault(require("http-errors"));
const connect_1 = __importDefault(require("./db/connect"));
dotenv_1.default.config({ path: "./.env" });
const app = (0, express_1.default)();
const redisClient = (0, redis_1.createClient)({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'),
    },
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis connected successfully"));
app.use((req, res, next) => {
    req.redisClient = redisClient;
    next();
});
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 0.5 * 60 * 1000, // 15 minutes
    max: 4,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
const urlRouter = require("./route/url");
const userRouter = require("./route/user");
const mainRouter = require("./route/base");
app.use((0, helmet_1.default)());
app.use(httpLogger_1.default);
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/auth", userRouter);
app.use("/api/url", urlRouter);
app.use("/", mainRouter);
app.use((req, res, next) => {
    next(http_errors_1.default.NotFound());
});
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    logger_1.default.error(err.message);
    res.status(status).json({ status, message });
});
const port = process.env.PORT || 4400;
const start = async () => {
    try {
        await (0, connect_1.default)(process.env.MONGO_URI || '');
        app.listen(port, () => {
            logger_1.default.info(`Server is running on port ${port}...`);
        });
    }
    catch (err) {
        console.log(err);
    }
};
start();
