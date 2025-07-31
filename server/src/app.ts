import cookieParser from "cookie-parser";
import express, { Application } from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
import { Request, Response } from "express";
import { connectDB } from "config/db";
import { env } from "config/env";
import router from "routes/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app: Application = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5500",
  "https://tyrant.vercel.app",
  "https://tyrant.kamleshsuthar.me",
  "https://nemesis.kamleshsuthar.me",
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

app.use("/api", router());
    // app.use("/api/product", productsRouter);
    // app.use("/api/payment", paymentRouter);
    // app.use("/api/orders", ordersRouter);
    // app.use("/api/user", usersRouter);
    // app.use("/api/auth", authRouter);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is Working Now");
});

connectDB();


app.listen(env.PORT, () => {
  console.log(`✅ Server started listening on port ${env.PORT}`);
});
