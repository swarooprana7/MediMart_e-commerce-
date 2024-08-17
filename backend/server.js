import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import connectDB from "./config/db.js";
const logActivity = require("./middleware/logactivity.js");
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config(); // Load environment variables from .env file

const port = process.env.PORT || 5000;

// Log the MongoDB URI to verify it's being loaded
console.log("MongoDB URI:", process.env.MONGO_URI);
// Connect to MongoDB
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve(); // Set {__dirname} to current working directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/payment", paymentRoutes);
//-------------------------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  //any app route that is not api will redirected to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });
}

//-------------------------------------
app.use(notFound);
app.use(errorHandler);

// Use the logActivity middleware
app.use(logActivity);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
