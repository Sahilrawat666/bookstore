import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdArrowForward, MdMailOutline } from "react-icons/md";
import toast from "react-hot-toast";

function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="border-b border-[#e5e5e5] bg-white py-16 dark:border-[#303030] dark:bg-[#111111]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="border border-[#e5e5e5] bg-[#f7f7f5] px-5 py-10 text-center sm:px-10 sm:py-12 dark:border-[#303030] dark:bg-[#181818]"
        >
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#315c4c]/10 text-[#315c4c] dark:bg-[#6f9f8b]/10 dark:text-[#6f9f8b]">
            <MdMailOutline size={22} />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#315c4c] dark:text-[#6f9f8b]">
            Stay in the loop
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl dark:text-[#f5f5f5]">
            Get more from your reading list
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#666666] sm:text-base dark:text-[#a3a3a3]">
            Get new book recommendations, collection updates, and reading
            inspiration delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-7 flex w-full max-w-xl flex-col gap-2.5 sm:flex-row sm:gap-3"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              className="h-11 w-full min-w-0 border border-[#d6d6d6] bg-white px-4 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#888888] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#f5f5f5] dark:placeholder:text-[#777777] dark:focus:border-[#6f9f8b]"
            />

            <button
              type="submit"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 bg-[#315c4c] px-5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#274c3f] active:scale-[0.98] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
            >
              Subscribe
              <MdArrowForward size={18} />
            </button>
          </form>

          <p className="mt-4 text-xs text-[#888888] dark:text-[#777777]">
            No spam. Just useful book updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default NewsletterSection;
