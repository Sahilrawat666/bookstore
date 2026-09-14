import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineShoppingCart,
  MdShoppingCart,
} from "react-icons/md";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Cards({ item, onRemove, type }) {
  const navigate = useNavigate();
  const [authUser, , , setCartCount, , setFavCount] = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (!authUser?._id) return;

    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/favourites/${authUser._id}`,
        );
        const favBooks = res.data || [];
        setIsFavourite(favBooks.some((book) => book._id === item._id));
      } catch (error) {
        console.error("Fav fetch error:", error);
      }
    };

    fetchFavourites();
  }, [authUser?._id, item._id]);

  useEffect(() => {
    if (!authUser?._id) return;

    const fetchCarts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/carts/${authUser._id}`,
        );
        const cartBooks = res.data || [];
        setIsInCart(cartBooks.some((book) => book._id === item._id));
      } catch (error) {
        console.error("Cart fetch error:", error);
      }
    };

    fetchCarts();
  }, [authUser?._id, item._id]);

  const addToFavourite = async (bookId) => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }

    const toastId = toast.loading("Adding to favourites...");

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/favourite`, {
        userId: authUser._id,
        bookId,
      });

      toast.success("Book added to favourites!", { id: toastId });
      setIsFavourite(true);
      setFavCount((prev) => prev + 1);
    } catch (error) {
      if (error.response?.data?.message === "Book already in favourites") {
        toast.error("Book already in favourites!");
      } else {
        toast.error("Something went wrong.");
        console.error(error.response?.data || error.message);
      }
    }
  };

  const removeFromFavourite = async (bookId) => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }

    const toastId = toast.loading("Removing from favourites...");

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/favourites/user/${authUser._id}/${bookId}`,
      );

      toast.success("Removed from favourites.", { id: toastId });
      setIsFavourite(false);
      setFavCount((prev) => (prev > 0 ? prev - 1 : 0));

      if (type === "favourite" && typeof onRemove === "function") {
        onRemove(bookId);
      }
    } catch (error) {
      toast.error("Error removing book");
      console.error(error);
    }
  };

  const addToCart = async (bookId) => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }

    const toastId = toast.loading("Adding to cart...");

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/cart`, {
        userId: authUser._id,
        bookId,
      });

      toast.success("Book added to cart!", { id: toastId });
      setIsInCart(true);
      setCartCount((prev) => prev + 1);
    } catch (error) {
      if (error.response?.data?.message === "Book already in carts") {
        toast.error("Book already in cart!");
      } else {
        toast.error("Something went wrong.");
        console.error(error.response?.data || error.message);
      }
    }
  };

  const removeFromCart = async (bookId) => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }

    const toastId = toast.loading("Removing from cart...");

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/carts/user/${authUser._id}/${bookId}`,
      );

      toast.success("Book removed from cart!", { id: toastId });
      setIsInCart(false);
      setCartCount((prev) => (prev > 0 ? prev - 1 : 0));

      if (type === "cart" && typeof onRemove === "function") {
        onRemove(bookId);
      }
    } catch (error) {
      toast.error("Error removing book");
      console.error(error);
    }
  };

  const handleBookClick = () => {
    navigate(`/book/${item._id}`);
  };

  const rating = Math.min(5, Math.max(0, Number(item.rating) || 4));

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group mx-1 my-3 overflow-hidden border border-[#e5e5e5] bg-white transition-shadow duration-200 hover:shadow-md dark:border-[#303030] dark:bg-[#1d1d1d]"
    >
      <div className="relative bg-[#f7f7f5] dark:bg-[#181818]">
        <button
          type="button"
          onClick={() =>
            isFavourite
              ? removeFromFavourite(item._id)
              : addToFavourite(item._id)
          }
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#dedede] bg-white text-[#171717] transition-colors hover:border-[#315c4c] hover:text-[#315c4c] dark:border-[#404040] dark:bg-[#1d1d1d] dark:text-[#f5f5f5] dark:hover:border-[#6f9f8b] dark:hover:text-[#6f9f8b]"
        >
          {isFavourite ? (
            <MdFavorite size={19} className="text-red-500" />
          ) : (
            <MdFavoriteBorder size={20} />
          )}
        </button>

        <button
          type="button"
          onClick={() =>
            isInCart ? removeFromCart(item._id) : addToCart(item._id)
          }
          aria-label={isInCart ? "Remove from cart" : "Add to cart"}
          className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#dedede] bg-white text-[#171717] transition-colors hover:border-[#315c4c] hover:text-[#315c4c] dark:border-[#404040] dark:bg-[#1d1d1d] dark:text-[#f5f5f5] dark:hover:border-[#6f9f8b] dark:hover:text-[#6f9f8b]"
        >
          {isInCart ? (
            <MdShoppingCart
              size={19}
              className="text-[#315c4c] dark:text-[#6f9f8b]"
            />
          ) : (
            <MdOutlineShoppingCart size={20} />
          )}
        </button>

        <button
          type="button"
          onClick={handleBookClick}
          className="flex h-64 w-full items-center justify-center p-8 sm:h-72"
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              size={12}
              className={
                index < rating
                  ? "text-[#d69e2e]"
                  : "text-[#d5d5d5] dark:text-[#555555]"
              }
            />
          ))}
          <span className="ml-1 text-xs text-[#666666] dark:text-[#a3a3a3]">
            ({item.reviews || 0})
          </span>
        </div>

        <button
          type="button"
          onClick={handleBookClick}
          className="mt-3 block w-full text-left"
        >
          <h2 className="truncate text-base font-semibold text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b]">
            {item.name}
          </h2>
        </button>

        <p className="mt-1 truncate text-sm text-[#666666] dark:text-[#a3a3a3]">
          {item.title}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-[#666666] dark:text-[#a3a3a3]">
              {item.category}
            </span>
            <p className="mt-1 text-base font-semibold text-[#171717] dark:text-[#f5f5f5]">
              {item.price === 0 ? "Free" : `$${item.price}`}
            </p>
          </div>

          {isInCart ? (
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="inline-flex h-9 items-center justify-center rounded-md border border-[#315c4c] px-3 text-xs font-semibold text-[#315c4c] transition-colors hover:bg-[#315c4c] hover:text-white dark:border-[#6f9f8b] dark:text-[#6f9f8b] dark:hover:bg-[#6f9f8b] dark:hover:text-[#111111]"
            >
              Go to cart
            </button>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(item._id)}
              className="inline-flex h-9 items-center justify-center rounded-md bg-[#315c4c] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#274c3f] active:scale-[0.98] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default Cards;
