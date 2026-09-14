import React from "react";
import { motion } from "framer-motion";
import {
  MdArrowForward,
  MdMenuBook,
  MdAutoStories,
  MdBookmarkBorder,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
function Hero() {
  const [authUser] = useAuth();
  return (
    <section className="relative overflow-hidden border-b border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#111111]">
      <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-16 md:min-h-[600px] md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:py-20 xl:min-h-[640px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#315c4c] sm:mb-5 sm:text-sm dark:text-[#6f9f8b]">
            Your reading starts here
          </p>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-[#171717] sm:text-5xl md:text-[54px] lg:text-6xl xl:text-[64px] dark:text-[#f5f5f5]">
            Find books worth
            <span className="block text-[#315c4c] dark:text-[#6f9f8b]">
              coming back to.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-[#666666] sm:mt-6 sm:text-base sm:leading-7 md:text-lg dark:text-[#a3a3a3]">
            Explore a carefully selected collection of books across stories,
            knowledge, learning, and more. Discover something new for your next
            read.
          </p>
          <div className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
            <Link
              to={authUser ? "/books" : "/login"}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#315c4c] px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#274c3f] active:scale-[0.98] sm:w-auto dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
            >
              <MdMenuBook size={19} />
              {authUser ? "Browse Books" : "Get Started"}
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[#d7d7d7] bg-white px-6 text-sm font-semibold text-[#171717] transition-all duration-200 hover:border-[#315c4c] hover:text-[#315c4c] active:scale-[0.98] sm:w-auto dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5] dark:hover:border-[#6f9f8b] dark:hover:text-[#6f9f8b]"
            >
              Contact Us <MdArrowForward size={18} />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-[#e5e5e5] pt-6 sm:mt-10 sm:gap-x-8 dark:border-[#303030]">
            <div>
              <p className="text-lg font-semibold text-[#171717] sm:text-xl dark:text-[#f5f5f5]">
                100+
              </p>
              <p className="mt-1 text-[11px] text-[#666666] sm:text-xs dark:text-[#a3a3a3]">
                Books available
              </p>
            </div>
            <div className="hidden h-8 w-px bg-[#d9d9d9] sm:block dark:bg-[#303030]" />
            <div>
              <p className="text-lg font-semibold text-[#171717] sm:text-xl dark:text-[#f5f5f5]">
                Multiple
              </p>
              <p className="mt-1 text-[11px] text-[#666666] sm:text-xs dark:text-[#a3a3a3]">
                Categories
              </p>
            </div>
            <div className="hidden h-8 w-px bg-[#d9d9d9] sm:block dark:bg-[#303030]" />
            <div>
              <p className="text-lg font-semibold text-[#171717] sm:text-xl dark:text-[#f5f5f5]">
                Easy
              </p>
              <p className="mt-1 text-[11px] text-[#666666] sm:text-xs dark:text-[#a3a3a3]">
                Online shopping
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto hidden h-[420px] w-full max-w-[500px] lg:block xl:h-[470px]"
        >
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[350px] w-[270px] -translate-x-1/2 -translate-y-1/2 border border-[#d9d9d9] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.07)] dark:border-[#303030] dark:bg-[#1d1d1d] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              <div className="flex h-full flex-col justify-between p-7">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#315c4c] dark:text-[#6f9f8b]">
                      Bookstore
                    </p>
                    <div className="mt-3 h-px w-10 bg-[#315c4c] dark:bg-[#6f9f8b]" />
                  </div>
                  <MdBookmarkBorder
                    size={22}
                    className="text-[#777777] dark:text-[#888888]"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#777777] dark:text-[#999999]">
                    Read. Discover. Repeat.
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-tight text-[#171717] dark:text-[#f5f5f5]">
                    Stories
                    <span className="block text-[#315c4c] dark:text-[#6f9f8b]">
                      that stay.
                    </span>
                  </h2>
                  <p className="mt-5 max-w-[190px] text-xs leading-5 text-[#777777] dark:text-[#a3a3a3]">
                    A carefully selected collection for curious readers.
                  </p>
                </div>
                <div className="flex items-end justify-between border-t border-[#e5e5e5] pt-5 dark:border-[#303030]">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#888888]">
                      Collection
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#171717] dark:text-[#f5f5f5]">
                      100+ Books
                    </p>
                  </div>
                  <MdAutoStories
                    size={25}
                    className="text-[#315c4c] dark:text-[#6f9f8b]"
                  />
                </div>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-4 left-4 w-[190px] border border-[#d9d9d9] bg-[#eee9df] p-5 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:border-[#303030] dark:bg-[#20251f] dark:shadow-[0_15px_35px_rgba(0,0,0,0.2)]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#315c4c] dark:text-[#6f9f8b]">
                Explore
              </p>
              <p className="mt-3 text-2xl font-semibold leading-tight text-[#171717] dark:text-[#f5f5f5]">
                Knowledge
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-[10px] text-[#777777] dark:text-[#999999]">
                  Learn something new
                </span>
                <MdArrowForward
                  size={17}
                  className="text-[#315c4c] dark:text-[#6f9f8b]"
                />
              </div>
            </motion.div>
            <div className="absolute right-2 top-8 h-16 w-16 border border-[#d9d9d9] dark:border-[#303030]" />
            <div className="absolute bottom-14 right-3 h-2 w-14 bg-[#315c4c] dark:bg-[#6f9f8b]" />
            <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9d9d9] bg-white text-[#315c4c] shadow-lg dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]">
              <MdMenuBook size={25} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default Hero;
