import express from "express";
import User from "../model/user.model.js";
import Book from "../model/book.model.js";
import { verifyAdmin } from "../middlewares/adminAuth.js";
import { verifyToken } from "../middlewares/userAuth.js";

const router = express.Router();

// Get all users
router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a user
router.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    // Prevent admin from deleting themselves
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// // Get all books
// router.get("/books", verifyAdmin, async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.status(200).json(books);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });
// Get all books (Admin only)
router.get("/books", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const books = await Book.find(); // fetch all books
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new book
router.post("/books", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, title, price, category, image } = req.body;

    const newBook = new Book({ name, title, price, category, image });
    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a book
router.delete("/books/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const bookId = req.params.id;

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Delete the book
    await Book.findByIdAndDelete(bookId);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// // View messages
// Get all user messages (admin only)
router.get("/messages", verifyToken, verifyAdmin, async (req, res) => {
  try {
    // Fetch only messages from users
    const users = await User.find().select("fullname email messages");

    // Flatten messages with user info
    const allMessages = users.flatMap((user) =>
      user.messages.map((msg) => ({
        ...msg.toObject(),
        user: user.fullname,
        email: user.email,
      }))
    );

    res.status(200).json(allMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
