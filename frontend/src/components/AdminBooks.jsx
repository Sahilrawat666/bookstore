import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null); // New state for editing
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    image: "",
  });
  const authUser = JSON.parse(localStorage.getItem("User"));

  // Fetch books
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
        setBooks(res.data.reverse());
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch books");
      }
    };
    fetchBooks();
  }, []);

  // Delete book
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

  // Handle input change
  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  // Add or Edit book
  const handleSaveBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.price) {
      toast.error("Title, Author and Price are required!");
      return;
    }

    try {
      if (editingBook) {
        // Edit existing book
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/admin/books/${editingBook._id}`,
          newBook,
          { headers: { Authorization: `Bearer ${authUser.token}` } }
        );
        setBooks(books.map((b) => (b._id === editingBook._id ? res.data : b)));
        toast.success("Book updated successfully!");
      } else {
        // Add new book
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/admin/books`,
          newBook,
          { headers: { Authorization: `Bearer ${authUser.token}` } }
        );
        setBooks([res.data, ...books]);
        toast.success("Book added successfully!");
      }
      setShowForm(false);
      setEditingBook(null);
      setNewBook({ title: "", author: "", price: "", category: "", image: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save book");
    }
  };

  // Open edit form
  const handleEdit = (book) => {
    setEditingBook(book);
    setNewBook({
      title: book.title,
      author: book.author,
      price: book.price,
      category: book.category,
      image: book.image,
    });
    setShowForm(true);
  };

  return (
    <div className="relative w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Books List
      </h3>

      <button
        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition transform active:scale-95 absolute right-0 top-0 shadow-md"
        onClick={() => {
          setEditingBook(null);
          setShowForm(!showForm);
          setNewBook({
            title: "",
            author: "",
            price: "",
            category: "",
            image: "",
          });
        }}
      >
        Add Book
      </button>

      {showForm && (
        <div className="fixed top-14 right-0 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-80 sm:w-96 z-50 flex flex-col gap-3 border border-gray-200 dark:border-gray-700 transition-transform transform scale-95 animate-scale-in">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white text-center mb-3">
            {editingBook ? "Edit Book" : "Add New Book"}
          </h3>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newBook.title}
            onChange={handleInputChange}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200 hover:shadow-md"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newBook.author}
            onChange={handleInputChange}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200 hover:shadow-md"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newBook.price}
            onChange={handleInputChange}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200 hover:shadow-md"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newBook.category}
            onChange={handleInputChange}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200 hover:shadow-md"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newBook.image}
            onChange={handleInputChange}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200 hover:shadow-md"
          />

          <div className="flex gap-3 mt-4 justify-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 active:scale-95 transition-transform duration-200 font-medium"
              onClick={handleSaveBook}
            >
              {editingBook ? "Update" : "Save"}
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 hover:scale-105 active:scale-95 transition-transform duration-200 font-medium"
              onClick={() => {
                setShowForm(false);
                setEditingBook(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow mt-12">
        <table className="min-w-full text-left text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr
                  key={book._id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3">{book.title}</td>
                  <td className="px-4 py-3">{book.category}</td>
                  <td className="px-4 py-3">{book.price}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow-md transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center px-4 py-6 text-gray-500 dark:text-gray-400"
                >
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBooks;
