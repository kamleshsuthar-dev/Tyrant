"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
// import { fileURLToPath } from "url";
// import path,{ dirname } from "path";
const os_1 = __importDefault(require("os"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const index_route_1 = __importDefault(require("./routes/index.route"));
const logger_1 = __importDefault(require("./config/logger"));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5500",
    "https://tyrant.vercel.app",
    "https://tyrant.kamleshsuthar.me",
    "https://nemesis.kamleshsuthar.me",
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    // origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use("/api", (0, index_route_1.default)());
// app.use("/api/product", productsRouter);
// app.use("/api/payment", paymentRouter);
// app.use("/api/orders", ordersRouter);
// app.use("/api/user", usersRouter);
// app.use("/api/auth", authRouter);
// Health check route
app.get("/", (req, res) => {
    res.status(200).send("Server is Working Now");
});
(0, db_1.connectDB)();
app.listen(env_1.env.PORT, () => {
    logger_1.default.info(`up and running in ${env_1.env.NODE_ENV || 'development'} @: ${os_1.default.hostname()} on port ${env_1.env.PORT}`);
});
