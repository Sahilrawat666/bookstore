import React, { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import toast from "react-hot-toast";

const NewsletterSection = () => {
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
    <section className="border-b border-[#e5e5e5] bg-[#f7f7f5] py-16 dark:border-[#303030] dark:bg-[#181818]">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#315c4c] dark:text-[#6f9f8b]">
          Stay updated
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl dark:text-[#f5f5f5]">
          Discover your next great read
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
          Subscribe for book recommendations, new arrivals, and updates from our
          bookstore.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
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
            className="h-11 flex-1 rounded-md border border-[#d8d8d8] bg-white px-4 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#888888] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#f5f5f5] dark:placeholder:text-[#777777] dark:focus:border-[#6f9f8b]"
          />

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#315c4c] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#274c3f] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
          >
            Subscribe
            <MdArrowForward size={18} />
          </button>
        </form>

        <p className="mt-4 text-xs text-[#888888] dark:text-[#777777]">
          No spam. Just useful book updates.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
