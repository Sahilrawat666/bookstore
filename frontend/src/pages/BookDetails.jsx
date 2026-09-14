import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdShoppingCart,
  MdArrowBack,
  MdFlashOn,
} from "react-icons/md";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function BookDetails() {
  const [authUser, , , setCartCount, , setFavCount] = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [related, setRelated] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        setError("No book ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/book/${id}`,
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch book");
        }

        const bookData = await response.json();
        setBook(bookData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/book/related/${id}`)
      .then((res) => setRelated(res.data))
      .catch((err) => console.error("Error fetching related books:", err));
  }, [id]);

  useEffect(() => {
    if (!authUser?._id || !book) return;

    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/favourites/${authUser._id}`,
        );
        const favBooks = res.data || [];
        setIsFavourite(favBooks.some((item) => item._id === book._id));
      } catch (err) {
        console.error("Fav fetch error:", err);
      }
    };

    fetchFavourites();
  }, [authUser?._id, book]);

  useEffect(() => {
    if (!authUser?._id || !book) return;

    const fetchCarts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/carts/${authUser._id}`,
        );
        const cartBooks = res.data || [];
        setIsInCart(cartBooks.some((item) => item._id === book._id));
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };

    fetchCarts();
  }, [authUser?._id, book]);

  const addToFavourite = async () => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }

    const toastId = toast.loading("Adding book to favourites...");

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/favourite`, {
        userId: authUser._id,
        bookId: book._id,
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

  const removeFromFavourite = async () => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }

    const toastId = toast.loading("Removing from favourites...");

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/favourites/user/${authUser._id}/${book._id}`,
      );

      toast.success("Removed from favourites.", { id: toastId });
      setIsFavourite(false);
      setFavCount((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (error) {
      toast.error("Error removing book");
      console.error(error);
    }
  };

  const addToCart = async () => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }

    const toastId = toast.loading("Adding to cart...");

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/cart`, {
        userId: authUser._id,
        bookId: book._id,
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

  const removeFromCart = async () => {
    if (!authUser) {
      toast.error("Please login first!");
      return;
    }

    const toastId = toast.loading("Removing from cart...");

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/carts/user/${authUser._id}/${book._id}`,
      );

      toast.success("Book removed from cart!", { id: toastId });
      setIsInCart(false);
      setCartCount((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (error) {
      toast.error("Error removing book");
      console.error(error);
    }
  };

  const handleBuyNow = () => {
    if (!authUser) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    const buyNowItem = {
      _id: book._id,
      name: book.name,
      price: book.price,
      quantity: 1,
      image: book.image,
    };

    localStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));
    navigate("/checkout");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-white px-4 pt-20 dark:bg-[#111111]">
          <div className="w-full max-w-md">
            <div className="h-96 animate-pulse border border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]" />
            <div className="mt-4 h-6 animate-pulse bg-[#f0f0ee] dark:bg-[#1d1d1d]" />
            <div className="mt-3 h-4 w-2/3 animate-pulse bg-[#f0f0ee] dark:bg-[#1d1d1d]" />
          </div>
        </main>
      </>
    );
  }

  if (error || !book) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-white px-4 pt-20 dark:bg-[#111111]">
          <div className="max-w-md text-center">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              {error || "Book not found"}
            </p>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-[#315c4c] px-5 text-sm font-semibold text-white hover:bg-[#274c3f] dark:bg-[#6f9f8b] dark:text-[#111111]"
            >
              <MdArrowBack size={18} />
              Go back
            </button>
          </div>
        </main>
      </>
    );
  }

  const rating = Math.min(5, Math.max(0, Number(book.rating) || 4));

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-20 dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
          >
            <MdArrowBack size={18} />
            Back
          </button>

          <section className="grid overflow-hidden border border-[#e5e5e5] bg-white lg:grid-cols-[420px_1fr] dark:border-[#303030] dark:bg-[#1d1d1d]">
            <div className="flex min-h-[420px] items-center justify-center bg-[#f7f7f5] p-8 dark:bg-[#181818] sm:min-h-[520px]">
              <img
                src={book.image}
                alt={book.name}
                className="max-h-[480px] max-w-full object-contain"
              />
            </div>

            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#315c4c] dark:text-[#6f9f8b]">
                  {book.category}
                </span>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#171717] sm:text-4xl dark:text-[#f5f5f5]">
                  {book.name}
                </h1>

                <p className="mt-3 text-base text-[#666666] dark:text-[#a3a3a3]">
                  {book.title}
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        size={14}
                        className={
                          index < rating
                            ? "text-[#d69e2e]"
                            : "text-[#d5d5d5] dark:text-[#555555]"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#666666] dark:text-[#a3a3a3]">
                    {book.rating || 4} ({book.reviews || 0} reviews)
                  </span>
                </div>

                <div className="mt-7 border-y border-[#e5e5e5] py-5 dark:border-[#303030]">
                  <p className="text-2xl font-semibold text-[#171717] dark:text-[#f5f5f5]">
                    {book.price === 0 ? "Free" : `$${book.price}`}
                  </p>
                </div>

                <p className="mt-6 text-sm leading-7 text-[#555555] dark:text-[#a3a3a3]">
                  {book.description ||
                    "Step into a world of imagination and discovery with this book. Perfect for readers looking for an engaging and enjoyable experience."}
                </p>

                <div className="mt-7 grid grid-cols-1 gap-3 border-b border-[#e5e5e5] pb-7 sm:grid-cols-3 dark:border-[#303030]">
                  <div>
                    <p className="text-xs text-[#888888] dark:text-[#777777]">
                      Author
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#171717] dark:text-[#f5f5f5]">
                      {book.author || "Unknown"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#888888] dark:text-[#777777]">
                      Publisher
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#171717] dark:text-[#f5f5f5]">
                      {book.publisher || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#888888] dark:text-[#777777]">
                      Pages
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#171717] dark:text-[#f5f5f5]">
                      {book.pages || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={isInCart ? removeFromCart : addToCart}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#315c4c] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#274c3f] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
                  >
                    <MdShoppingCart size={19} />
                    {isInCart ? "Remove from Cart" : "Add to Cart"}
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#315c4c] px-5 text-sm font-semibold text-[#315c4c] transition-colors hover:bg-[#315c4c] hover:text-white dark:border-[#6f9f8b] dark:text-[#6f9f8b] dark:hover:bg-[#6f9f8b] dark:hover:text-[#111111]"
                  >
                    <MdFlashOn size={19} />
                    {book.price === 0 ? "Read Now" : "Buy Now"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={isFavourite ? removeFromFavourite : addToFavourite}
                  className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#e0e0e0] text-sm font-medium text-[#555555] transition-colors hover:border-red-300 hover:text-red-500 dark:border-[#303030] dark:text-[#a3a3a3] dark:hover:border-red-800 dark:hover:text-red-400"
                >
                  {isFavourite ? (
                    <MdFavorite size={18} className="text-red-500" />
                  ) : (
                    <MdFavoriteBorder size={18} />
                  )}
                  {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
                </button>
              </div>
            </div>
          </section>

          {related.length > 0 && (
            <section className="mt-14">
              <div className="mb-6 border-b border-[#e5e5e5] pb-4 dark:border-[#303030]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#315c4c] dark:text-[#6f9f8b]">
                  More to explore
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#171717] dark:text-[#f5f5f5]">
                  You may also like
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                {related.map((item) => (
                  <Cards key={item._id} item={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default BookDetails;
