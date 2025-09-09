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

//get single book sdata
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

// add book to favourite
// router.put("/add_to_favourite", async (req, res) => {
//   try {
//     const { bookId, id } = req.headers;
//     const userData = await User.findById(id);
//     const isBookFavourite = userData.favourite.includes(bookId);
//     if (isBookFavourite) {
//       return res.status(200).json({ message: "book is already in favourite" });
//     }
//     await User.findByIdAndUpdate(id, {
//       $push: { favourite: bookId },
//     });
//     return res.status(200).json({ message: "book added to favourite" });
//   } catch (error) {
//     return res.status(500).json({ message: "internal server error" });
//   }
// });

export default router;
