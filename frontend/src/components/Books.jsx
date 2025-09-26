import React, { useEffect, useState } from "react";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/admin/books", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, [token]);
  // //  add books
  //   const handleAdd = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const res = await axios.post(
  //         "http://localhost:4001/admin/books",
  //         { title, author, price },
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );
  //       setBooks([...books, res.data]);
  //       setTitle("");
  //       setAuthor("");
  //       setPrice("");
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  // delete book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/admin/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Manage Books</h3>
      <form className="mb-4 flex gap-2" onSubmit={handleAdd}>
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add Book
        </button>
      </form>

      <ul>
        {books.map((book) => (
          <li
            key={book._id}
            className="flex justify-between border p-2 rounded mb-2"
          >
            <span>
              {book.title} - {book.author} - ${book.price}
            </span>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(book._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
