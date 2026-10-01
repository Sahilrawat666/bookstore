import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { MdArrowBack, MdEmail, MdMessage, MdSend } from "react-icons/md";
import { useAuth } from "../context/AuthProvider";

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [authUser] = useAuth();

  const onSubmit = async (data) => {
    if (!authUser?._id) {
      toast.error("You must be logged in to send a message");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/messages/${authUser._id}`,
        data,
      );

      if (res.data.message) {
        toast.success("Message sent successfully!");
        reset();
      }
    } catch (err) {
      console.error("Error sending message:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      <section className="border-b border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#181818]">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-1.5 text-sm text-[#666666] transition-colors duration-200 hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
            >
              <MdArrowBack size={18} />
              Back to home
            </Link>

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#315c4c] dark:text-[#6f9f8b]">
              Get in touch
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl dark:text-[#f5f5f5]">
              Contact Us
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
              Have a question, suggestion, or need help? Send us a message and
              we'll get back to you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:pt-2"
          >
            <div className="flex h-10 w-10 items-center justify-center bg-[#315c4c]/10 text-[#315c4c] dark:bg-[#6f9f8b]/10 dark:text-[#6f9f8b]">
              <MdMessage size={21} />
            </div>

            <h2 className="mt-4 text-xl font-semibold text-[#171717] dark:text-[#f5f5f5]">
              We'd love to hear from you
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
              Whether you have feedback about our bookstore or need help with
              something, feel free to reach out.
            </p>

            <div className="mt-6 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#e5e5e5] text-[#315c4c] dark:border-[#303030] dark:text-[#6f9f8b]">
                <MdEmail size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#f5f5f5]">
                  Message support
                </p>

                <p className="mt-0.5 text-xs leading-5 text-[#777777] dark:text-[#999999]">
                  Send your question using the form and our team will review it.
                </p>
              </div>
            </div>

            <div className="mt-6 border-l-2 border-[#315c4c] bg-[#f7f7f5] px-4 py-3 dark:border-[#6f9f8b] dark:bg-[#181818]">
              <p className="text-xs leading-5 text-[#666666] dark:text-[#a3a3a3]">
                You need to be logged in before sending a message.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="border border-[#e5e5e5] bg-white p-5 dark:border-[#303030] dark:bg-[#1d1d1d] sm:p-6"
          >
            <div className="border-b border-[#e5e5e5] pb-4 dark:border-[#303030]">
              <h2 className="text-lg font-semibold text-[#171717] dark:text-[#f5f5f5]">
                Send a message
              </h2>

              <p className="mt-1 text-sm text-[#666666] dark:text-[#a3a3a3]">
                Fill in the details below to contact us.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-[#171717] dark:text-[#f5f5f5]"
                  >
                    Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="mt-1.5 h-10 w-full border border-[#d9d9d9] bg-white px-3 text-sm text-[#171717] outline-none transition-colors duration-200 placeholder:text-[#999999] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5] dark:placeholder:text-[#777777] dark:focus:border-[#6f9f8b]"
                    {...register("name", {
                      required: "This field is required",
                    })}
                  />

                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-[#171717] dark:text-[#f5f5f5]"
                  >
                    Email
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="mt-1.5 h-10 w-full border border-[#d9d9d9] bg-white px-3 text-sm text-[#171717] outline-none transition-colors duration-200 placeholder:text-[#999999] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5] dark:placeholder:text-[#777777] dark:focus:border-[#6f9f8b]"
                    {...register("email", {
                      required: "This field is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />

                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-[#171717] dark:text-[#f5f5f5]"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  rows="6"
                  placeholder="Type your message..."
                  className="mt-1.5 w-full resize-none border border-[#d9d9d9] bg-white px-3 py-2.5 text-sm leading-6 text-[#171717] outline-none transition-colors duration-200 placeholder:text-[#999999] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5] dark:placeholder:text-[#777777] dark:focus:border-[#6f9f8b]"
                  {...register("message", {
                    required: "This field is required",
                  })}
                />

                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-3 border-t border-[#e5e5e5] pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-[#303030]">
                <p className="text-xs text-[#888888] dark:text-[#777777]">
                  Please make sure your details are correct.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-10 w-full items-center justify-center gap-2 bg-[#315c4c] px-5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#274c3f] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
                >
                  <MdSend size={17} />
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default ContactForm;
