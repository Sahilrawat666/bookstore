import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from "axios";

function Cource() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book`);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  // ✅ Group books by category
  const groupedBooks = book.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto pt-38 md:px-8 px-3">
        {/* Top intro section */}
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-semibold">
            We are delighted to have you{" "}
            <span className="text-pink-500">here...!</span>
          </h1>
          <p className="mt-6 text-gray-600 dark:text-gray-300">
            Discover a world of knowledge and imagination at your fingertips.
            Whether you're a curious learner, a passionate reader, or a
            knowledge seeker, our collection has something just for you. Dive
            into your next favorite book and let the journey begin.
          </p>
          <Link to="/">
            <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 mt-6 cursor-pointer">
              Back
            </button>
          </Link>
        </div>

        {/* ✅ Books grouped by category */}
        <div className="mt-12 space-y-12">
          {Object.keys(groupedBooks).map((category) => (
            <div key={category}>
              <h2 className="text-xl md:text-2xl font-bold mb-6 capitalize">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {groupedBooks[category].map((item) => (
                  <Cards key={item._id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cource;
