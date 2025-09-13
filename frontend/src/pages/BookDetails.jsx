import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaCartPlus, FaHeart } from "react-icons/fa";
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

  // get related books
  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/book/related/${id}`)
        .then((res) => setRelated(res.data))
        .catch((err) => console.error("Error fetching related books:", err));
    }
  }, [id]);

  // add to favourite
  const addToFavourite = async (bookId) => {
    if (!authUser?._id) {
      toast.error("Please login first!");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/favourite`, {
        userId: authUser._id,
        bookId: bookId,
      });
      toast.success("Book added to favourites!");
      setFavCount((prev) => prev + 1);
    } catch (error) {
      if (error.response?.data?.message === "Book already in favourites") {
        toast.error("Book already in favourites!");
      } else {
        toast.error("Something went wrong.");
        console.error(error.response?.data || error.message);
      }
    }
  };

  // add to cart
  const addToCart = async (bookId) => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/cart`, {
        userId: authUser._id,
        bookId: bookId,
      });
      toast.success("Book added to cart!");
      setCartCount((prev) => prev + 1);
    } catch (error) {
      // Check if the backend indicates the book is already in favourites
      if (error.response?.data?.message === "Book already in carts") {
        toast.error("Book already in cart!");
      } else {
        toast.error("Something went wrong.");
        console.error(error.response?.data || error.message);
      }
    }
  };
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="text-xl text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );

  if (!book)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="text-xl mb-4">Book not found</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );

  // Function to display star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <>
      <Navbar />
      <div className="bg-slate-100 min-h-screen">
        <div className="max-w-[1440px]  mx-auto p-4 sm:p-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            ← Back
          </button>

          {/* Book Card */}
          <div className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">
            {/* Book Image */}
            <div className="md:w-1/3 w-full h-64 md:h-auto">
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Book Details */}
            <div className="md:w-2/3 w-full p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  {book.name}
                </h1>
                <p className="text-gray-500 mb-4">{book.title}</p>

                {/* Category & Price */}
                <div className="flex flex-wrap items-center mb-4 gap-4">
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {book.category}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-green-600">
                    {book.price === 0 ? "Free" : `$${book.price}`}
                  </span>
                </div>

                {/* Rating */}

                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-700">
                    {/* {book.description || "No description available."} */}
                    Step into a magical world where animals sing, dance, and
                    tell stories that will capture your heart. Perfect for
                    readers of all ages, this book blends imagination with
                    beautiful illustrations that bring every page to life.
                    Whether you're reading alone or sharing it with family, it’s
                    a story you'll want to revisit again and again.
                  </p>
                </div>
              </div>

              {/* key features  */}
              <div className="mt-10 bg-white p-6 rounded-lg ">
                <h2 className="text-xl font-semibold mb-2">Highlights</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Easy-to-follow illustrations</li>
                  <li>Engaging storytelling style</li>
                  <li>Perfect for all age groups</li>
                  <li>Over 100+ pages of musical fun</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4">
                <button
                  className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
                  onClick={() => addToCart(book._id)}
                >
                  <FaCartPlus />{" "}
                  {book.price === 0 ? "Get Free Book" : "Add to Cart"}
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition flex items-center justify-center gap-2"
                  onClick={() => addToFavourite(book._id)}
                >
                  <FaHeart /> Add to Favourite
                </button>
                <button className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  {book.price === 0 ? "Read Now" : "Buy Now"}
                </button>
              </div>
            </div>
          </div>
          {/* ✅ Related Books Section */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">You may also like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {related.map((b) => (
                  <div
                    key={b._id}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/book/${b._id}`);
                      // window.scrollTo(0, 0); //  Scroll to top of the page
                    }}
                  >
                    <img
                      src={b.image}
                      alt={b.name}
                      className="h-40 w-full object-cover rounded"
                    />
                    <h3 className="mt-2 font-semibold">{b.name}</h3>
                    <p className="text-sm text-gray-500">{b.category}</p>
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
