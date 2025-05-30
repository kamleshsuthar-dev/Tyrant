import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import db from "./config/mongooseConnection.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

import { authRouter } from "./routes/authRouter.js";
import categoryRouter from "./routes/categoriesRouter.js";
import { ordersRouter } from "./routes/ordersRouter.js";
import { otpRouter } from "./routes/otpRouter.js";
import { ownersRouter } from "./routes/ownersRouter.js";
// import { paymentRouter } from "./routes/paymentRouter.js";
import { productsRouter } from "./routes/productsRouter.js";
import { usersRouter } from "./routes/usersRouter.js";

import flash from "connect-flash";
import cors from "cors";
import expressSession from "express-session";
import { redis } from "./config/redis.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(flash());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5500",
  "https://tyrant.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    // origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/api/product", productsRouter);
app.use("/api/category", categoryRouter);
// app.use("/api/payment", paymentRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/user", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/otp", otpRouter);

app.get("/", (req, res) => {
  res.status(200).send("Server is Working");
});
app.get("/api/dashboard", async (req, res) => {
  let value = await redis.get("name");
  res.send(`Welcome ${value}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server started listening on port ${process.env.PORT}`);
});

