import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function Books() {
  const [book, setBook] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  // Extract unique categories
  const categories = ["All", ...new Set(book.map((item) => item.category))];

  // Filter books
  const filteredBooks =
    selectedCategory === "All"
      ? book
      : book.filter((item) => item.category === selectedCategory);

  const groupedBooks = filteredBooks.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto px-3 md:px-8 py-16 mt-13 sm:mt-15">
        {/* Hero Section */}
        <div className="relative text-center mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl -z-10 blur-3xl opacity-30"></div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white">
            Welcome to Your Knowledge Hub{" "}
            <span className="text-pink-500">📚</span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover a world of knowledge and imagination at your fingertips.
            Explore curated collections, stories, and guides that spark your
            curiosity and elevate your learning journey.
          </p>

          <div className="mt-6 flex justify-center items-center gap-4 flex-wrap">
            <Link to="/">
              <button className="bg-pink-500 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300">
                Back to Home
              </button>
            </Link>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 
                  ${
                    selectedCategory === cat
                      ? "bg-pink-500 text-white shadow-lg"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-pink-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Books Section */}
        <div className="space-y-16">
          {Object.keys(groupedBooks).map((category) => (
            <div key={category}>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-6 capitalize text-gray-800 dark:text-white border-b-2 border-pink-500 inline-block pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ">
                {groupedBooks[category].map((item) => (
                  <div
                    key={item._id}
                    // className="transform transition-transform duration-300 hover:scale-105  rounded-xl"
                  >
                    <Cards item={item} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 relative bg-gradient-to-r from-pink-100 to-purple-100 dark:from-gray-800 dark:to-gray-900  p-12 text-center overflow-hidden">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Stay Ahead with Our Free Courses
          </h3>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest courses, resources,
            and guides delivered straight to your inbox.
          </p>

          <div className="mt-6 flex justify-center flex-wrap gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-full w-72 md:w-96 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
            <button className="bg-pink-500 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Books;
