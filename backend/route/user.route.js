import express from "express";
import { login, signup } from "../controller/user.controller.js";
import User from "../model/user.model.js";
import book from "../model/book.model.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Add book to favourites

router.post("/favourite", async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ message: "userId and bookId required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favourites.includes(bookId)) {
      return res.status(400).json({ message: "Book already in favourites" });
    }

    user.favourites.push(bookId);
    await user.save();

    res.status(200).json({
      message: "Book added to favourites",
      favourites: user.favourites,
    });
  } catch (error) {
    console.error("Error adding favourite:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get favourites
router.get("/favourites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("favourites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.favourites);
  } catch (error) {
    console.error("Error fetching favourites:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Remove book from favourites
router.delete("/favourites/user/:userId/:bookId", async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // remove book
    user.favourites = user.favourites.filter(
      (fav) => fav.toString() !== bookId
    );

    await user.save();

    res.status(200).json({
      message: "Book removed from favourites",
      favourites: user.favourites,
    });
  } catch (error) {
    console.error("Error removing favourite:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// add to cart
router.post("/cart", async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ message: "userId and bookId required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.carts.includes(bookId)) {
      return res.status(400).json({ message: "Book already in carts" });
    }

    user.carts.push(bookId);
    await user.save();

    res.status(200).json({
      message: "Book added to cart",
      carts: user.carts,
    });
  } catch (error) {
    console.error("Error adding cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// get carts
router.get("/carts/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // find user and populate favourites with full book details
    const user = await User.findById(userId).populate("carts");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // return carts books
    res.status(200).json(user.carts);
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Remove book from carts
router.delete("/carts/user/:userId/:bookId", async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    // find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // remove book from cart array
    user.carts = user.carts.filter((cart) => cart.toString() !== bookId);

    await user.save();

    res.status(200).json({
      message: "Book removed from cart!",
      carts: user.carts,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Submit contact message
router.post("/messages/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.messages.push({ name, email, message });
    await user.save();

    res.status(200).json({
      message: "Message saved successfully",
      messages: user.messages,
    });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
