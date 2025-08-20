import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BookDetails() {
  const { id } = useParams();
  console.log("Book ID from params:", id);
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        setError("No book ID provided");
        setLoading(false);
        return;
      }

      try {
        const url = `${window.location.origin}/book/${id}`;
        console.log("Fetching from URL:", url);

        const response = await fetch(url);

        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch book");
        }

        const bookData = await response.json();
        console.log("Fetched book data:", bookData);
        setBook(bookData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-xl text-red-500 mb-4">Error: {error}</div>
        <div className="text-sm text-gray-600 mb-4">Book ID: {id}</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-xl mb-4">Book not found</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }
  const headers = {
    id: localStorage.getItem("id"),
    bookid: id,
  };
  const handleFavourite = async () => {
    const response = await axios.get(
      `${window.location.origin}/book/add_to_favourite`,
      {}
    );
    console.log(response);
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={book.image}
              className="w-full  object-cover"
              // onError={(e) => {
              //   e.target.src =
              //     "https://via.placeholder.com/400x600?text=No+Image";
              // }}
            />
          </div>
          <div className="md:w-2/3 p-8">
            <h1 className=" md:text-3xl text-3xl font-bold text-gray-800 mb-4">
              {book.name}
            </h1>

            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {book.category}
              </span>
            </div>

            <div className="mb-6">
              <span className="text-2xl font-bold text-green-600">
                {book.price === 0 ? "Free" : `$${book.price}`}
              </span>
            </div>

            {book.name && (
              <div className="mb-4">
                <p className="text-gray-600">{book.title}</p>
              </div>
            )}

            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                {book.price === 0 ? "Get Free Book" : "Add to Cart"}
              </button>
              <button
                className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors "
                onClick={handleFavourite}
              >
                {book.price === 0 ? "Get Free Book" : "Add to Favourite"}
              </button>
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                {book.price === 0 ? "Read Now" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
