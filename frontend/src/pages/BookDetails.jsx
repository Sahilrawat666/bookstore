import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaCartPlus, FaHeart } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function BookDetails() {
  const [authUser, setAuthUser] = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        setError("No book ID provided");
        setLoading(false);
        return;
      }
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/book/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch book");
        }
        const bookData = await response.json();
        setBook(bookData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/book/related/${id}`)
        .then((res) => setRelated(res.data))
        .catch((err) => console.error("Error fetching related books:", err));
    }
  }, [id]);
  //add to favourite
  const addToFavourite = async (bookId) => {
    if (!authUser?._id) {
      toast.error("Please login first!");
      return;
    }
    const FavToastId = toast.loading("Adding book to favourites...");

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/favourite`, {
        userId: authUser._id,
        bookId: bookId,
      });
      toast.success("Book added to favourites!", { id: FavToastId });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };
  //add to cart
  const addToCart = async (bookId) => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }
    const addToCartToastId = toast.loading("Adding to cart");

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/cart`, {
        userId: authUser._id,
        bookId: bookId,
      });
      toast.success("Book added to cart!", { id: addToCartToastId });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  if (loading)
    return (
      <div className="flex  justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Loading...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="text-xl text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    );

  if (!book)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="text-xl mb-4 text-gray-800 dark:text-gray-200">
          Book not found
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="bg-slate-100 dark:bg-slate-900 min-h-screen">
        <div className="max-w-[1440px] mx-auto p-4 sm:p-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
          >
            ← Back
          </button>

          {/* Book Card */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row md:gap-6">
            {/* Book Image */}
            <div className="md:w-1/3 w-full h-80 md:h-auto flex justify-center items-center bg-gray-50 dark:bg-gray-900 p-4">
              <img
                src={book.image}
                alt={book.name}
                className="max-h-full max-w-full object-contain rounded-md"
              />
            </div>

            {/* Book Details */}
            <div className="md:w-2/3 w-full p-6 md:p-8 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
                  {book.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-300">{book.title}</p>

                {/* Category & Price */}
                <div className="flex flex-wrap items-center gap-4">
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                    {book.category}
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    {book.price === 0 ? "Free" : `$${book.price}`}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < (book.rating || 4)
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-500"
                      }
                    >
                      <FaStar />
                    </span>
                  ))}
                  <span className="ml-2 text-gray-500 dark:text-gray-300 text-sm">
                    ({book.reviews || 0} reviews)
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300">
                  {book.description ||
                    "Step into a magical world of imagination with this book. Perfect for readers of all ages."}
                </p>
              </div>

              {/* Key Features */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Highlights
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Easy-to-follow illustrations</li>
                  <li>Engaging storytelling style</li>
                  <li>Perfect for all age groups</li>
                  <li>Over 100+ pages of fun</li>
                  <li>High-quality illustrations and design</li>
                </ul>
              </div>

              {/* Author & Publish Info */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mt-2">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Author:</span>{" "}
                    {book.author || "Unknown"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Publisher:</span>{" "}
                    {book.publisher || "N/A"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Pages:</span>{" "}
                    {book.pages || 0}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 flex-wrap w-full sm:w-auto">
                  <button
                    className="flex-1 sm:flex-none w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
                    onClick={() => addToCart(book._id)}
                  >
                    <FaCartPlus />{" "}
                    {book.price === 0 ? "Get Free Book" : "Add to Cart"}
                  </button>
                  <button
                    className="flex-1 sm:flex-none w-full sm:w-auto px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition flex items-center justify-center gap-2"
                    onClick={() => addToFavourite(book._id)}
                  >
                    <FaHeart /> Add to Favourite
                  </button>
                  <button className="flex-1 sm:flex-none w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    {book.price === 0 ? "Read Now" : "Buy Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Books */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                You may also like
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {related.map((b) => (
                  <div
                    key={b._id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/book/${b._id}`);
                    }}
                  >
                    <img
                      src={b.image}
                      alt={b.name}
                      className="h-48 w-full object-contain rounded"
                    />
                    <h3 className="mt-3 font-semibold text-center text-gray-800 dark:text-white">
                      {b.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {b.category}
                    </p>
                    <p className="text-green-600 font-bold">
                      {b.price === 0 ? "Free" : `$${b.price}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookDetails;
