import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "../config/mongodb.js";
import userRouter from "../routes/user.route.js";
import productRouter from "../routes/product.route.js";
import cartRouter from "../routes/cart.route.js";
import orderRouter from "../routes/order.route.js";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";

// Initialize app
const app = express();

// Connect to MongoDB
await connectDB();

// CORS
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// Export serverless handler
export const handler = serverless(app);
