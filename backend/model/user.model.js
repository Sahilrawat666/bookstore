import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    carts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    messages: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

export default User;
