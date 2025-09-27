import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Books = () => {
  const [books, setBooks] = useState([]);
  const authUser = JSON.parse(localStorage.getItem("User")); // get logged-in user
  const [showForm, setShowForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    image: "",
  });
  //   const handleInputChange = (e) => {
  //     setNewBook({ ...newBook, [e.target.name]: e.target.value });
  //   };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/books`,
          {
            headers: authUser
              ? { Authorization: `Bearer ${authUser.token}` }
              : {},
          }
        );
        setBooks(res.data);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch books");
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admin/books/${id}`,
        {
          headers: { Authorization: `Bearer ${authUser.token}` },
        }
      );
      setBooks(books.filter((b) => b._id !== id));
      toast.success("Book deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete book");
    }
  };

  //   add book
  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.price) {
      toast.error("Title, Author and Price are required!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/books`,
        newBook,
        {
          headers: { Authorization: `Bearer ${authUser.token}` },
        }
      );
      toast.success("Book added successfully!");
      setBooks([...books, res.data]);
      setShowForm(false);
      setNewBook({ title: "", author: "", price: "", category: "", image: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <div className="relative">
      <h3 className="text-xl font-semibold mb-2">Books List</h3>
      <button
        className="px-2 py-1 bg-slate-400 rounded-lg hover:scale-105 active:scale-95 transition transform duration-300 absolute right-2 top-0"
        onClick={() => setShowForm(!showForm)}
      >
        Add Book
      </button>

      {showForm && (
        <div className="absolute top-10 right-0 bg-white p-4 shadow rounded-lg z-50">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newBook.title}
            onChange={handleInputChange}
            className="border p-1 mb-2 w-full"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newBook.author}
            onChange={handleInputChange}
            className="border p-1 mb-2 w-full"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newBook.price}
            onChange={handleInputChange}
            className="border p-1 mb-2 w-full"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newBook.category}
            onChange={handleInputChange}
            className="border p-1 mb-2 w-full"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newBook.image}
            onChange={handleInputChange}
            className="border p-1 mb-2 w-full"
          />
          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded"
              onClick={handleAddBook}
            >
              Save
            </button>
            <button
              className="bg-gray-400 text-white px-3 py-1 rounded"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Price</th>
            {authUser?.role === "admin" && (
              <th className="border px-4 py-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">{book.price}</td>
              {authUser?.role === "admin" && (
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
