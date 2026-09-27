import React from "react";
import { motion } from "framer-motion";
import { MdArrowForward, MdMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";
import Cards from "./Cards.jsx";

function FeaturedBooks({ books, loading, error }) {
  const featuredBooks = books
    .filter((book) =>
      ["story", "GK", "music"].includes(String(book.category).toLowerCase()),
    )
    .slice(0, 8);

  return (
    <section className="border-b border-[#e5e5e5] bg-white py-14 dark:border-[#303030] dark:bg-[#111111]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-[#315c4c] dark:text-[#6f9f8b]">
              <MdMenuBook size={19} />
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                Curated for you
              </span>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl dark:text-[#f5f5f5]">
              Featured Books
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#666666] sm:text-base dark:text-[#a3a3a3]">
              A handpicked selection of books worth adding to your reading list.
            </p>
          </div>

          <Link
            to="/books"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#315c4c] transition-all duration-200 hover:gap-2.5 hover:text-[#274c3f] dark:text-[#6f9f8b] dark:hover:text-[#82ad9b]"
          >
            View all books
            <MdArrowForward size={18} />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[390px] animate-pulse border border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]"
              />
            ))}
          </div>
        ) : error ? (
          <div className="border border-dashed border-[#d9d9d9] px-6 py-14 text-center dark:border-[#303030]">
            <p className="text-sm text-[#666666] dark:text-[#a3a3a3]">
              {error}
            </p>
          </div>
        ) : featuredBooks.length === 0 ? (
          <div className="border border-dashed border-[#d9d9d9] px-6 py-14 text-center dark:border-[#303030]">
            <p className="text-sm font-medium text-[#171717] dark:text-[#f5f5f5]">
              Featured books are coming soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {featuredBooks.map((book) => (
              <Cards key={book._id} item={book} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedBooks;
