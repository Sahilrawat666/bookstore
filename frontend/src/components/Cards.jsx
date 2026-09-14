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
    if (!authUser?._id) {
      setIsFavourite(false);
      return;
    }

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
    if (!authUser?._id) {
      setIsInCart(false);
      return;
    }

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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group mx-1 my-2 flex h-full min-w-0 flex-col overflow-hidden border border-[#e5e5e5] bg-white transition-shadow duration-200 hover:shadow-md sm:mx-1.5 sm:my-2.5 md:mx-2 md:my-3 lg:mx-2.5 lg:my-3 dark:border-[#303030] dark:bg-[#1d1d1d]"
    >
      <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-[#f7f7f5] sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[3/4] dark:bg-[#181818]">
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
          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#dedede] bg-white shadow-sm transition-all duration-200 hover:border-[#315c4c] hover:text-[#315c4c] active:scale-95 sm:right-2.5 sm:top-2.5 sm:h-8 sm:w-8 md:right-3 md:top-3 md:h-9 md:w-9 dark:border-[#404040] dark:bg-[#1d1d1d] dark:text-[#f5f5f5] dark:hover:border-[#6f9f8b] dark:hover:text-[#6f9f8b]"
        >
          {isFavourite ? (
            <MdFavorite
              size={15}
              className="text-red-500 sm:size-[17px] md:size-[19px]"
            />
          ) : (
            <MdFavoriteBorder
              size={16}
              className="sm:size-[18px] md:size-[20px]"
            />
          )}
        </button>

        <button
          type="button"
          onClick={() =>
            isInCart ? removeFromCart(item._id) : addToCart(item._id)
          }
          aria-label={isInCart ? "Remove from cart" : "Add to cart"}
          className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#dedede] bg-white shadow-sm transition-all duration-200 hover:border-[#315c4c] hover:text-[#315c4c] active:scale-95 sm:left-2.5 sm:top-2.5 sm:h-8 sm:w-8 md:left-3 md:top-3 md:h-9 md:w-9 dark:border-[#404040] dark:bg-[#1d1d1d] dark:text-[#f5f5f5] dark:hover:border-[#6f9f8b] dark:hover:text-[#6f9f8b]"
        >
          {isInCart ? (
            <MdShoppingCart
              size={15}
              className="text-[#315c4c] sm:size-[17px] md:size-[19px] dark:text-[#6f9f8b]"
            />
          ) : (
            <MdOutlineShoppingCart
              size={16}
              className="sm:size-[18px] md:size-[20px]"
            />
          )}
        </button>

        <button
          type="button"
          onClick={handleBookClick}
          aria-label={`View ${item.name}`}
          className="flex h-full w-full items-center justify-center p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8"
        >
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-3.5 md:p-4 lg:p-4.5 xl:p-5">
        <div className="flex min-w-0 items-center gap-1">
          <div className="flex shrink-0 items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                size={10}
                className={
                  index < rating
                    ? "text-[#d69e2e] sm:size-[11px] md:size-[12px]"
                    : "text-[#d5d5d5] sm:size-[11px] md:size-[12px] dark:text-[#555555]"
                }
              />
            ))}
          </div>

          <span className="ml-1 truncate text-[10px] text-[#666666] sm:text-[11px] md:text-xs dark:text-[#a3a3a3]">
            ({item.reviews || 0})
          </span>
        </div>

        <button
          type="button"
          onClick={handleBookClick}
          className="mt-2 w-full min-w-0 text-left sm:mt-2.5 md:mt-3"
        >
          <h2 className="truncate text-xs font-semibold leading-5 text-[#171717] transition-colors hover:text-[#315c4c] sm:text-sm sm:leading-5 md:text-base md:leading-6 dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b]">
            {item.name}
          </h2>
        </button>

        <p className="mt-0.5 truncate text-[11px] leading-5 text-[#666666] sm:mt-1 sm:text-xs md:text-sm dark:text-[#a3a3a3]">
          {item.title}
        </p>

        <div className=" flex flex-col gap-2.5 pt-3 sm:gap-3 sm:pt-4 md:flex-row md:items-end md:justify-between md:gap-2.5 md:pt-5">
          <div className="min-w-0">
            <span className="block truncate text-[10px] text-[#666666] sm:text-[11px] md:text-xs dark:text-[#a3a3a3]">
              {item.category}
            </span>

            <p className="mt-0.5 text-xs font-semibold text-[#171717] sm:mt-1 sm:text-sm md:text-base dark:text-[#f5f5f5]">
              {item.price === 0 ? "Free" : `$${item.price}`}
            </p>
          </div>

          {isInCart ? (
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="inline-flex h-8 w-full shrink-0 items-center justify-center rounded-md border border-[#315c4c] px-2.5 text-[10px] font-semibold text-[#315c4c] transition-all duration-200 hover:bg-[#315c4c] hover:text-white active:scale-[0.98] sm:h-9 sm:w-auto sm:px-3 sm:text-xs dark:border-[#6f9f8b] dark:text-[#6f9f8b] dark:hover:bg-[#6f9f8b] dark:hover:text-[#111111]"
            >
              Go to cart
            </button>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(item._id)}
              className="inline-flex h-8 w-full shrink-0 items-center justify-center rounded-md bg-[#315c4c] px-2.5 text-[10px] font-semibold text-white transition-all duration-200 hover:bg-[#274c3f] active:scale-[0.98] sm:h-9 sm:w-auto sm:px-3 sm:text-xs dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
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
