import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import cors from "cors";
import userRoute from "./route/user.route.js";
import adminRoute from "./route/admin.route.js";
import orderRoutes from "./route/order.route.js";

// import orderRoutes from "./route/order.routes.js"

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

//connect to mongodb
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);

  console.log("connected to mongodb");

} catch (error) {
  console.log("error:", error);
}

//defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/orders", orderRoutes);

// app.get("/", (req, res) => {
//   res.redirect(process.env.FRONTEND_URL);
// });

// it will only run locally on this and vercel will ignore it
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
}

export default app;
