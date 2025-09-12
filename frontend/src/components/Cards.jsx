import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useEffect } from "react";
// import book from "../../../model/book.model";

function Cards({ item }) {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);
  console.log(authUser);

  // Check if this book is already in favourites on mount
  // useEffect(() => {
  //   if (!authUser?._id) return;

  //   const fetchFavourites = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_URL}/user/favourites/${authUser._id}`
  //       );
  //       const favBooks = res.data.favourites || [];

  //       // mark red if book is in favourites
  //       setIsFavourite(favBooks.includes(item._id));
  //     } catch (err) {
  //       console.error("Fav fetch error:", err);
  //     }
  //   };

  //   fetchFavourites();
  // }, [authUser?._id, item._id]);

  // add to favourite
  const addToFavourite = async (bookId) => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/favourite`, {
        userId: authUser._id,
        bookId: bookId,
      });
      toast.success("Book added to favourites!");
      setIsFavourite(true);
    } catch (error) {
      // Check if the backend indicates the book is already in favourites
      if (error.response?.data?.message === "Book already in favourites") {
        toast.error("Book already in favourites!");
      } else {
        toast.error("Something went wrong.");
        console.error(error.response?.data || error.message);
      }
    }
  };
  // add to cart
  const addToCart = async (bookId) => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/cart`, {
        userId: authUser._id,
        bookId: bookId,
      });
      toast.success("Book added to carts!");
    } catch (error) {
      // Check if the backend indicates the book is already in favourites
      if (error.response?.data?.message === "Book already in carts") {
        toast.error("Book already in cart!");
      } else {
        toast.error("Something went wrong.");
        console.error(error.response?.data || error.message);
      }
    }
  };

  return (
    <div
      // onClick={() => navigate(`/book/${item._id}`)}
      className="relative mx-auto my-4  w-60  cursor-pointer  rounded-2xl bg-white shadow-lg transition-transform duration-200 hover:scale-105 dark:bg-slate-900"
    >
      {/* Cart Icon */}
      <MdOutlineShoppingCart
        className="absolute top-2 right-2 rounded-full border p-1 text-2xl text-black hover:bg-red-400 dark:text-white"
        onClick={() => addToCart(item._id)}
      />
      {/* Favorite Icon */}
      <MdFavoriteBorder
        className={`absolute top-12 right-2 rounded-full border p-1 text-2xl 
    ${
      isFavourite
        ? "bg-red-500 text-white"
        : "text-black hover:bg-red-400 dark:text-white"
    }`}
        onClick={() => addToFavourite(item._id)}
      />

      {/* {isFavourite ? (
        <MdFavorite
          className="absolute top-12 right-2 rounded-full border p-1 text-2xl bg-red-500 text-white"
          onClick={() => addToFavourite(item._id)}
        />
      ) : (
        <MdFavoriteBorder
          className="absolute top-12 right-2 rounded-full border p-1 text-2xl text-black hover:bg-red-400 dark:text-white"
          onClick={() => addToFavourite(item._id)}
        />
      )} */}
      {/* Image */}
      <figure className="flex items-center justify-center p-2">
        <img
          src={item.image}
          alt={item.name}
          className="h-48 w-32 object-contain"
          onClick={() => navigate(`/book/${item._id}`)}
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
