import React from "react";
import { motion } from "framer-motion";
import { MdArrowForward, MdAutoStories } from "react-icons/md";
import { Link } from "react-router-dom";

function ReadingPromo() {
  const readingImage =
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=85";

  return (
    <section className="border-b border-[#e5e5e5] bg-[#f7f7f5] py-14 dark:border-[#303030] dark:bg-[#181818]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden border border-[#dcdcd8] bg-white dark:border-[#303030] dark:bg-[#1d1d1d]"
        >
          <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <div className="mb-4 flex items-center gap-2 text-[#315c4c] dark:text-[#6f9f8b]">
                <MdAutoStories size={20} />

                <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                  Make time for reading
                </span>
              </div>

              <h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-[#171717] sm:text-3xl lg:text-4xl dark:text-[#f5f5f5]">
                Your next great story is waiting for you.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#666666] sm:text-base dark:text-[#a3a3a3]">
                Whether you want to escape into a story, learn something useful,
                or discover a new perspective, find a book that fits your mood.
              </p>

              <Link
                to="/books"
                className="mt-7 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-md bg-[#315c4c] px-5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#274c3f] active:scale-[0.98] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
              >
                Start exploring
                <MdArrowForward size={18} />
              </Link>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:min-h-[420px]"
            >
              <img
                src={readingImage}
                alt="A collection of books representing the joy of reading"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                  Find your next read
                </p>

                <p className="mt-1 text-lg font-semibold text-white sm:text-xl">
                  Stories that stay with you.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ReadingPromo;
