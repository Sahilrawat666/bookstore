import React from "react";

const NewsletterSection = () => {
  return (
    <div className=" relative bg-gradient-to-r from-[#5F81E4] to-purple-100 dark:from-gray-800 dark:to-gray-900  p-12 text-center overflow-hidden">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
        Stay Ahead with Our Free Courses
      </h3>
      <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-semibold">
        Subscribe to our newsletter and get the latest courses, resources, and
        guides delivered straight to your inbox.
      </p>

      <div className="mt-6 flex justify-center flex-wrap gap-4 ">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 border shadow-md rounded-full w-72 md:w-96 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        />
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsletterSection;
