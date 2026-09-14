import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiBookOpen, FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";

const emptyBook = {
  title: "",
  author: "",
  price: "",
  category: "",
  image: "",
};

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [newBook, setNewBook] = useState(emptyBook);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        toast.error("Please login as admin.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/books`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setBooks([...res.data].reverse());
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [token]);

  const resetForm = () => {
    setNewBook(emptyBook);
    setEditingBook(null);
    setShowForm(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewBook((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEdit = (book) => {
    setEditingBook(book);

    setNewBook({
      title: book.title || "",
      author: book.author || "",
      price: book.price || "",
      category: book.category || "",
      image: book.image || "",
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admin/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setBooks((current) => current.filter((book) => book._id !== id));

      toast.success("Book deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete book");
    }
  };

  const handleSaveBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.price) {
      toast.error("Title, Author and Price are required");
      return;
    }

    try {
      setSaving(true);

      if (editingBook) {
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/admin/books/${editingBook._id}`,
          newBook,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setBooks((current) =>
          current.map((book) =>
            book._id === editingBook._id ? res.data : book,
          ),
        );

        toast.success("Book updated successfully");
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/admin/books`,
          newBook,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setBooks((current) => [res.data, ...current]);

        toast.success("Book added successfully");
      }

      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save book");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="w-full">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-[#e5e5e5] bg-[#f7f7f5] text-[#315c4c] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]">
            <FiBookOpen aria-hidden="true" />
          </div>

          <div>
            <h3 className="text-base font-semibold">Book catalogue</h3>
            <p className="text-sm text-[#666666] dark:text-[#a3a3a3]">
              Add, edit and remove books from the store.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingBook(null);
            setNewBook(emptyBook);
            setShowForm(true);
          }}
          className="inline-flex items-center justify-center gap-2 bg-[#315c4c] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#284d40] active:scale-[0.98] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
        >
          <FiPlus aria-hidden="true" />
          Add book
        </button>
      </div>

      {showForm && (
        <div className="mb-6 border border-[#e5e5e5] bg-[#f7f7f5] p-5 dark:border-[#303030] dark:bg-[#1d1d1d] sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold">
                {editingBook ? "Edit book" : "Add new book"}
              </h4>

              <p className="mt-1 text-xs text-[#666666] dark:text-[#a3a3a3]">
                Enter the catalogue information below.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="flex h-9 w-9 items-center justify-center border border-[#e5e5e5] text-[#666666] transition-colors hover:bg-white hover:text-[#171717] dark:border-[#303030] dark:hover:bg-[#181818] dark:hover:text-[#f5f5f5]"
              aria-label="Close form"
            >
              <FiX aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                name: "title",
                label: "Title",
                type: "text",
                placeholder: "Book title",
              },
              {
                name: "author",
                label: "Author",
                type: "text",
                placeholder: "Author name",
              },
              {
                name: "price",
                label: "Price",
                type: "number",
                placeholder: "Book price",
              },
              {
                name: "category",
                label: "Category",
                type: "text",
                placeholder: "Book category",
              },
            ].map((field) => (
              <label key={field.name} className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[#666666] dark:text-[#a3a3a3]">
                  {field.label}
                </span>

                <input
                  type={field.type}
                  name={field.name}
                  value={newBook[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  min={field.type === "number" ? "0" : undefined}
                  className="w-full border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#999999] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5] dark:focus:border-[#6f9f8b]"
                />
              </label>
            ))}

            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-semibold text-[#666666] dark:text-[#a3a3a3]">
                Image URL
              </span>

              <input
                type="url"
                name="image"
                value={newBook.image}
                onChange={handleInputChange}
                placeholder="https://..."
                className="w-full border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#999999] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5] dark:focus:border-[#6f9f8b]"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={resetForm}
              className="border border-[#e5e5e5] px-4 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-white hover:text-[#171717] dark:border-[#303030] dark:hover:bg-[#181818] dark:hover:text-[#f5f5f5]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveBook}
              disabled={saving}
              className="bg-[#315c4c] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#284d40] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
            >
              {saving ? "Saving..." : editingBook ? "Update book" : "Save book"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse border border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]"
            />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="border border-dashed border-[#e5e5e5] px-6 py-12 text-center dark:border-[#303030]">
          <FiBookOpen
            className="mx-auto mb-3 text-2xl text-[#666666] dark:text-[#a3a3a3]"
            aria-hidden="true"
          />
          <p className="font-medium">No books found</p>
          <p className="mt-1 text-sm text-[#666666] dark:text-[#a3a3a3]">
            Add your first book to start building the catalogue.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden border border-[#e5e5e5] dark:border-[#303030]">
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="border-b border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Book</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#e5e5e5] dark:divide-[#303030]">
                {books.map((book) => (
                  <tr
                    key={book._id}
                    className="transition-colors hover:bg-[#f7f7f5] dark:hover:bg-[#1d1d1d]"
                  >
                    <td className="px-4 py-4">
                      <div className="flex min-w-[240px] items-center gap-3">
                        <div className="h-12 w-9 shrink-0 overflow-hidden border border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#181818]">
                          {book.image ? (
                            <img
                              src={book.image}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[#666666]">
                              <FiBookOpen aria-hidden="true" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium">{book.title}</p>
                          <p className="truncate text-xs text-[#666666] dark:text-[#a3a3a3]">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-[#666666] dark:text-[#a3a3a3]">
                      {book.category || "—"}
                    </td>

                    <td className="px-4 py-4 font-semibold">₹{book.price}</td>

                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(book)}
                          className="inline-flex items-center gap-2 border border-[#e5e5e5] px-3 py-2 text-xs font-semibold text-[#666666] transition-colors hover:border-[#315c4c] hover:text-[#315c4c] dark:border-[#303030] dark:text-[#a3a3a3] dark:hover:border-[#6f9f8b] dark:hover:text-[#6f9f8b]"
                        >
                          <FiEdit2 aria-hidden="true" />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(book._id)}
                          className="inline-flex items-center gap-2 border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
                        >
                          <FiTrash2 aria-hidden="true" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminBooks;
