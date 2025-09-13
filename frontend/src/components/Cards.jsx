import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineShoppingCart,
} from "react-icons/md";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useEffect } from "react";
// import book from "../../../model/book.model";

function Cards({ item, onRemove, type }) {
  const navigate = useNavigate();
  const [
    authUser,
    setAuthUser,
    cartCount,
    setCartCount,
    favCount,
    setFavCount,
  ] = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  // console.log(authUser);

  // Check if this book is already in favourites on mount
  useEffect(() => {
    if (!authUser?._id) return;

    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/favourites/${authUser._id}`
        );

        const favBooks = res.data || []; // API returns array of books
        const isBookFav = favBooks.some((book) => book._id === item._id);

        setIsFavourite(isBookFav);
      } catch (err) {
        console.error("Fav fetch error:", err);
      }
    };

    fetchFavourites();
  }, [authUser?._id, item._id]);

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
      setFavCount((prev) => prev + 1);
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

  //  Remove favourite API call
  const removeFromFavourite = async (bookId) => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/favourites/user/${
          authUser._id
        }/${bookId}`
      );
      toast.success("Removed from favourites");
      setIsFavourite(false);

      setFavCount((prev) => (prev > 0 ? prev - 1 : 0));

      // window.location.reload();
      // 🔹 Notify parent if callback exists
      if (type === "favourite" && typeof onRemove === "function") {
        onRemove(bookId);
      }
    } catch (err) {
      toast.error("Error removing book");
      console.error(err);
    }
  };

  // Check if this book is already in carts on mount
  useEffect(() => {
    if (!authUser?._id) return;

    const fetchCarts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/carts/${authUser._id}`
        );

        const cartBooks = res.data || []; // API returns array of books
        const isBookCart = cartBooks.some((book) => book._id === item._id);

        setIsInCart(isBookCart);
      } catch (err) {
        console.error("Fav fetch error:", err);
      }
    };

    fetchCarts();
  }, [authUser?._id, item._id]);

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
      toast.success("Book added to cart!");
      setIsInCart(true);
      setCartCount((prev) => prev + 1);
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

  //  Remove from cart
  const removeFromCart = async (bookId) => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/carts/user/${
          authUser._id
        }/${bookId}`
      );
      toast.success("Book removed from cart!");
      setIsInCart(false);
      setCartCount((prev) => (prev > 0 ? prev - 1 : 0)); // 🔹 decrement cart count

      // window.location.reload();
      // 🔹 Notify parent if callback exists
      if (type === "cart" && typeof onRemove === "function") {
        onRemove(bookId);
      }
    } catch (err) {
      toast.error("Error removing book");
      console.error(err);
    }
  };

  return (
    <div className="relative mx-auto my-4  w-60  cursor-pointer  rounded-2xl bg-white shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-105 dark:bg-[#f4f4f430] dark:border-gray-700">
      {/* add and remove from cart icons */}
      {isInCart ? (
        <MdOutlineShoppingCart
          className="absolute top-2 right-2 rounded-full border p-1 text-2xl transform transition-transform duration-200 hover:scale-110 active:scale-95 bg-green-500 text-white"
          onClick={() => removeFromCart(item._id)}
        />
      ) : (
        <MdOutlineShoppingCart
          className="absolute top-2 right-2 rounded-full border p-1 text-2xl text-black dark:text-white  transform transition-transform duration-200 hover:scale-110 active:scale-95"
          onClick={() => addToCart(item._id)}
        />
      )}

      {/* add and remove from favourite icons  */}
      {isFavourite ? (
        <MdFavorite
          className="absolute top-12 right-2 rounded-full border p-1 text-2xl transform transition-transform duration-200 hover:scale-110 active:scale-95 bg-red-500 text-white"
          onClick={() => removeFromFavourite(item._id)}
        />
      ) : (
        <MdFavoriteBorder
          className="absolute top-12 right-2 rounded-full border p-1 text-2xl transform transition-transform duration-200 hover:scale-110 active:scale-95 text-black dark:text-white"
          onClick={() => addToFavourite(item._id)}
        />
      )}

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
          {isInCart ? (
            <button
              className="rounded-md border border-slate-400 px-4 py-1 text-white  text-sm font-semibold text-gray-700 transition duration-200  bg-pink-500 dark:border-white  dark:text-white"
              onClick={() => removeFromCart(item._id)}
            >
              Remove from cart
            </button>
          ) : (
            <button
              className="rounded-md border border-slate-400 px-4 py-1  text-sm font-semibold text-gray-700 transition duration-200   dark:border-white dark:bg-slate-900 dark:text-white"
              onClick={() => addToCart(item._id)}
            >
              Add to cart
            </button>
          )}
          {/* <button
            className="rounded-md border border-slate-400 px-4 py-1  text-sm font-semibold text-gray-700 transition duration-200 hover:bg-pink-500 hover:text-white dark:border-white dark:bg-slate-900 dark:text-white"
            onClick={() => addToCart(item._id)}
          >
            Add to cart
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Cards;
