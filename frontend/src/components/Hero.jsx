import React from "react";
import { motion } from "framer-motion";
import { MdArrowForward, MdMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

function Hero() {
  const [authUser] = useAuth();

  return (
    <section className="relative overflow-hidden border-b border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#111111]">
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#315c4c] dark:text-[#6f9f8b]">
            Your reading starts here
          </p>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-[#171717] sm:text-5xl lg:text-6xl dark:text-[#f5f5f5]">
            Find books worth
            <span className="block text-[#315c4c] dark:text-[#6f9f8b]">
              coming back to.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#666666] sm:text-lg dark:text-[#a3a3a3]">
            Explore a carefully selected collection of books across stories,
            knowledge, learning, and more. Discover something new for your next
            read.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to={authUser ? "/books" : "/login"}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#315c4c] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#274c3f] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
            >
              <MdMenuBook size={19} />
              {authUser ? "Browse Books" : "Get Started"}
            </Link>

            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#d7d7d7] bg-white px-6 text-sm font-semibold text-[#171717] transition-colors hover:border-[#315c4c] hover:text-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5] dark:hover:border-[#6f9f8b] dark:hover:text-[#6f9f8b]"
            >
              Contact Us
              <MdArrowForward size={18} />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#e5e5e5] pt-6 dark:border-[#303030]">
            <div>
              <p className="text-xl font-semibold text-[#171717] dark:text-[#f5f5f5]">
                100+
              </p>
              <p className="mt-1 text-xs text-[#666666] dark:text-[#a3a3a3]">
                Books available
              </p>
            </div>

            <div className="h-8 w-px bg-[#d9d9d9] dark:bg-[#303030]" />

            <div>
              <p className="text-xl font-semibold text-[#171717] dark:text-[#f5f5f5]">
                Multiple
              </p>
              <p className="mt-1 text-xs text-[#666666] dark:text-[#a3a3a3]">
                Categories
              </p>
            </div>

            <div className="h-8 w-px bg-[#d9d9d9] dark:bg-[#303030]" />

            <div>
              <p className="text-xl font-semibold text-[#171717] dark:text-[#f5f5f5]">
                Easy
              </p>
              <p className="mt-1 text-xs text-[#666666] dark:text-[#a3a3a3]">
                Online shopping
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative hidden min-h-[420px] lg:block"
        >
          <div className="absolute right-8 top-8 h-80 w-56 rotate-[-7deg] border border-[#d8d8d8] bg-white p-3 shadow-sm dark:border-[#303030] dark:bg-[#1d1d1d]">
            <div className="flex h-full items-end bg-[#e9e5dc] p-5 dark:bg-[#252923]">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#666666] dark:text-[#a3a3a3]">
                  Read
                </p>
                <p className="mt-2 text-3xl font-semibold leading-tight text-[#171717] dark:text-[#f5f5f5]">
                  Stories
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-10 h-80 w-56 rotate-[6deg] border border-[#d8d8d8] bg-white p-3 shadow-sm dark:border-[#303030] dark:bg-[#1d1d1d]">
            <div className="flex h-full items-end bg-[#dfe8e2] p-5 dark:bg-[#26322c]">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#315c4c] dark:text-[#6f9f8b]">
                  Explore
                </p>
                <p className="mt-2 text-3xl font-semibold leading-tight text-[#171717] dark:text-[#f5f5f5]">
                  Knowledge
                </p>
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9d9d9] bg-white text-[#315c4c] shadow-sm dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]">
            <MdMenuBook size={28} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
