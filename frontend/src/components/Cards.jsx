import React from "react";
import { useNavigate } from "react-router-dom";
import { MdFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";

function Cards({ item }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/book/${item._id}`)}
      className="relative mx-auto my-4  w-60  cursor-pointer  rounded-2xl bg-white shadow-lg transition-transform duration-200 hover:scale-105 dark:bg-slate-900"
    >
      {/* Cart Icon */}
      <MdOutlineShoppingCart className="absolute top-2 right-2 rounded-full border p-1 text-2xl text-black hover:bg-red-400 dark:text-white" />

      {/* Favorite Icon */}
      <MdFavoriteBorder className="absolute top-12 right-2 rounded-full border p-1 text-2xl text-black hover:bg-red-400 dark:text-white" />

      {/* Image */}
      <figure className="flex items-center justify-center p-2">
        <img
          src={item.image}
          alt={item.name}
          className="h-48 w-32 object-contain"
        />
      </figure>

      {/* Card Body */}
      <div className="p-4">
        <h2 className="truncate mb-2 flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
          {item.name}
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-white">
            {item.category}
          </span>
        </h2>

        <p className=" truncate  mb-3 text-sm text-gray-600 dark:text-gray-300">
          {item.title}
        </p>

        <div className="flex items-center justify-between">
          {/* Price */}
          <span className="rounded-md border border-slate-400 px-3 py-1 text-sm font-medium text-gray-700 dark:border-white dark:bg-slate-900 dark:text-white">
            ${item.price}
          </span>

          {/* Buy Button */}
          <button className="rounded-md border border-slate-400 px-4 py-1 text-sm font-semibold text-gray-700 transition duration-200 hover:bg-pink-500 hover:text-white dark:border-white dark:bg-slate-900 dark:text-white">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
