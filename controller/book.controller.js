import mongoose from "mongoose";
import Book from "../model/book.model.js";
import book from "../model/book.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json(error);
  }
};
