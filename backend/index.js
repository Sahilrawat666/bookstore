import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import cors from "cors";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();

//  CORS setup
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI;

// connect to mongodb
mongoose
  .connect(URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.redirect(process.env.FRONTEND_URL);
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
