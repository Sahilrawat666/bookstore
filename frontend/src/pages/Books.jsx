import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsletterSection from "../components/NewsletterSection";
import { motion } from "framer-motion";

function Books() {
  const [book, setBook] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book`);
        setBook(res.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load books right now.");
      } finally {
        setLoading(false);
      }
    };

    getBook();
  }, []);

  const categories = ["All", ...new Set(book.map((item) => item.category))];

  const filteredBooks =
    selectedCategory === "All"
      ? book
      : book.filter((item) => item.category === selectedCategory);

  const groupedBooks = filteredBooks.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }

    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-20 dark:bg-[#111111]">
        <section className="border-b border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#181818]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#315c4c] dark:text-[#6f9f8b]">
                Our collection
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#171717] sm:text-4xl dark:text-[#f5f5f5]">
                Browse all books
              </h1>

              <p className="mt-4 text-sm leading-6 text-[#666666] sm:text-base dark:text-[#a3a3a3]">
                Explore our collection by category and find your next book to
                read, learn from, or enjoy.
              </p>
            </motion.div>

            {!loading && categories.length > 1 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${selectedCategory === category ? "border-[#315c4c] bg-[#315c4c] text-white dark:border-[#6f9f8b] dark:bg-[#6f9f8b] dark:text-[#111111]" : "border-[#d9d9d9] bg-white text-[#555555] hover:border-[#315c4c] hover:text-[#315c4c] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#a3a3a3] dark:hover:border-[#6f9f8b] dark:hover:text-[#6f9f8b]"}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="h-[380px] animate-pulse border border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]"
                />
              ))}
            </div>
          ) : error ? (
            <div className="border border-red-200 bg-red-50 px-6 py-12 text-center dark:border-red-900 dark:bg-red-950/20">
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                {error}
              </p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="border border-dashed border-[#d9d9d9] px-6 py-16 text-center dark:border-[#303030]">
              <p className="text-sm font-medium text-[#171717] dark:text-[#f5f5f5]">
                No books found in this category.
              </p>
            </div>
          ) : (
            <div className="space-y-14">
              {Object.keys(groupedBooks).map((category) => (
                <section key={category}>
                  <div className="mb-6 flex items-center justify-between border-b border-[#e5e5e5] pb-4 dark:border-[#303030]">
                    <div>
                      <h2 className="text-xl font-semibold capitalize text-[#171717] sm:text-2xl dark:text-[#f5f5f5]">
                        {category}
                      </h2>
                      <p className="mt-1 text-xs text-[#666666] dark:text-[#a3a3a3]">
                        {groupedBooks[category].length}{" "}
                        {groupedBooks[category].length === 1 ? "book" : "books"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                    {groupedBooks[category].map((item) => (
                      <Cards key={item._id} item={item} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </section>
      </main>

      <NewsletterSection />
      <Footer />
    </>
  );
}

export default Books;
