import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthProvider.jsx";
import { ArrowRight, BookOpen } from "lucide-react";

function Hero() {
  const [authUser] = useAuth();

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://books.livingword.ph/wp-content/uploads/2021/08/livingword-online-bookstore-header-1920-2-min.jpg')] bg-cover bg-center brightness-75 transition-all duration-700 hover:brightness-90"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/50 "></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-6 sm:px-10 md:px-16 max-w-3xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-blue-300 font-medium text-lg sm:text-xl tracking-widest mb-2 animate-pulse"
        >
          Your Digital Reading Companion
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-md"
        >
          Explore the World of <span className="text-blue-400">Books</span>{" "}
          Anytime, Anywhere
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-200 text-base sm:text-lg md:text-xl mb-8 leading-relaxed"
        >
          Discover thousands of eBooks and read your favorites instantly. Learn,
          grow, and get inspired — one page at a time.
        </motion.p>

        {authUser ? (
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="/books"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-semibold text-lg py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition duration-300"
          >
            <BookOpen className="w-5 h-5" />
            Browse Books
          </motion.a>
        ) : (
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="/login"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-semibold text-lg py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition duration-300"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}

export default Hero;
