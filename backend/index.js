import express, { request } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import cors from "cors";
import userRoute from "./route/user.route.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import book from "./model/book.model.js";
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT;
const URI = process.env.MONGODB_URI;

//connect to mongodb
try {
  mongoose.connect(URI);
  //if using momgodb compass
  // mongoose.connect(URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  console.log("connected to mongodb");
} catch (error) {
  console.log("error:", error);
}

//defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
// app.use("/favourite", userRoute);

// app.get("/book/:id", async (req, res) => {
//   const id = req.params.id;
//   const filter = { _id: new Object(id) };
//   const result = await book.findOne(filter);
//   res.send(result);
// });

app.use(express.static(path.resolve(__dirname, "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
