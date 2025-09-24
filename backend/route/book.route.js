import express from "express";
import { getAllBooks } from "../controller/book.controller.js";
import book from "../model/book.model.js";
import mongoose from "mongoose";

const router = express.Router();
//get all books
router.get("/", getAllBooks);

//search book
router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const books = await book.find({
      name: { $regex: query, $options: "i" },
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
});

//get single book data
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID format" });
    }

    const result = await book.findById(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get related books by category

router.get("/related/:id", async (req, res) => {
  try {
    const { id } = req.params;

    //  Check if valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    //  Find current book
    const currentBook = await book.findById(id);
    if (!currentBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    //  Find other books in same category (excluding current one)
    const relatedBooks = await book
      .find({
        category: currentBook.category,
        _id: { $ne: currentBook._id },
      })
      .limit(6);

    res.json(relatedBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
