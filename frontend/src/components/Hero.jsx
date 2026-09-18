import React from "react";
import { motion } from "framer-motion";
import { MdArrowForward, MdMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
function Hero() {
  const [authUser] = useAuth();
  return (
    <section className="relative overflow-hidden border-b border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#111111]">
      <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 md:min-h-[600px] md:gap-12 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:py-20 xl:min-h-[640px]">
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
          className="flex w-full items-center justify-center lg:justify-end"
        >
          <div className="relative h-[350px] w-full max-w-[270px] overflow-hidden sm:h-[390px] sm:max-w-[320px] md:h-[440px] md:max-w-[360px] lg:h-[480px] lg:max-w-[390px] xl:h-[520px] xl:max-w-[420px]">
            <img
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85"
              alt="Book"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover shadow-[0_20px_45px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-[1.02] dark:shadow-[0_20px_45px_rgba(0,0,0,0.3)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default Hero;
