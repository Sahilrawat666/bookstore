import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";
import Cards from "../components/Cards.jsx";

function FavouriteBooks({ userId }) {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!userId) {
        setFavourites([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/favourites/${userId}`,
        );

        setFavourites(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching favourites:", err);
        setError("We couldn't load your favourite books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [userId]);

  const handleRemove = (bookId) => {
    setFavourites((prev) => prev.filter((book) => book._id !== bookId));
  };

  return (
    <>
      {" "}
      ```
      <main className="min-h-screen bg-white text-[#171717] dark:bg-[#111111] dark:text-[#f5f5f5]">
        <section className="border-b border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#181818]">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#315c4c] dark:text-[#6f9f8b]">
                <FiHeart size={16} />
                Saved collection
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Your favourite books
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[#666666] dark:text-[#a3a3a3] sm:text-base">
                Keep the books you love close. Your saved collection is ready
                whenever you want to revisit, explore, or add your next read to
                the cart.
              </p>

              {!loading && favourites.length > 0 && (
                <div className="mt-6 flex items-center gap-3 text-sm text-[#666666] dark:text-[#a3a3a3]">
                  <span className="font-semibold text-[#171717] dark:text-[#f5f5f5]">
                    {favourites.length}
                  </span>
                  {favourites.length === 1 ? "book saved" : "books saved"}
                </div>
              )}
            </div>

            <div className="hidden shrink-0 sm:flex h-20 w-20 items-center justify-center border border-[#e5e5e5] bg-white text-[#315c4c] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#6f9f8b] lg:h-24 lg:w-24">
              <FiHeart size={34} strokeWidth={1.5} />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden border border-[#e5e5e5] bg-white dark:border-[#303030] dark:bg-[#1d1d1d]"
                >
                  <div className="h-64 animate-pulse bg-[#f0f0ed] dark:bg-[#181818] sm:h-72" />
                  <div className="space-y-3 p-4">
                    <div className="h-3 w-20 animate-pulse bg-[#eeeeeb] dark:bg-[#303030]" />
                    <div className="h-4 w-3/4 animate-pulse bg-[#eeeeeb] dark:bg-[#303030]" />
                    <div className="h-3 w-1/2 animate-pulse bg-[#eeeeeb] dark:bg-[#303030]" />
                    <div className="h-9 w-full animate-pulse bg-[#eeeeeb] dark:bg-[#303030]" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center border border-[#e5e5e5] px-6 text-center dark:border-[#303030]">
              <div className="flex h-12 w-12 items-center justify-center bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400">
                <FiHeart size={22} />
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                Unable to load favourites
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 inline-flex h-10 items-center justify-center bg-[#315c4c] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#274c3f] active:scale-[0.98] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
              >
                Try again
              </button>
            </div>
          ) : favourites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex min-h-[420px] flex-col items-center justify-center border border-[#e5e5e5] bg-[#f7f7f5] px-6 text-center dark:border-[#303030] dark:bg-[#181818]"
            >
              <div className="flex h-16 w-16 items-center justify-center border border-[#e5e5e5] bg-white text-[#315c4c] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]">
                <FiBookOpen size={27} strokeWidth={1.5} />
              </div>

              <h2 className="mt-6 text-xl font-semibold">
                Your collection is empty
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
                You haven't saved any books yet. Browse the collection and add
                the books you want to keep for later.
              </p>

              <Link
                to="/books"
                className="mt-7 inline-flex h-11 items-center gap-2 bg-[#315c4c] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#274c3f] active:scale-[0.98] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
              >
                Browse books
                <FiArrowRight size={16} />
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="mb-7 flex flex-col gap-4 border-b border-[#e5e5e5] pb-6 dark:border-[#303030] sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#315c4c] dark:text-[#6f9f8b]">
                    Your library
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    Saved for later
                  </h2>
                </div>

                <Link
                  to="/books"
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#315c4c] transition-colors hover:text-[#274c3f] hover:underline dark:text-[#6f9f8b] dark:hover:text-[#82ad9b]"
                >
                  Continue browsing
                  <FiArrowRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                {favourites.map((book) => (
                  <Cards
                    key={book._id}
                    item={book}
                    type="favourite"
                    onRemove={handleRemove}
                  />
                ))}
              </div>

              <div className="mt-12 flex justify-center border-t border-[#e5e5e5] pt-8 dark:border-[#303030]">
                <Link
                  to="/books"
                  className="inline-flex h-11 items-center gap-2 border border-[#315c4c] px-6 text-sm font-semibold text-[#315c4c] transition-colors hover:bg-[#315c4c] hover:text-white active:scale-[0.98] dark:border-[#6f9f8b] dark:text-[#6f9f8b] dark:hover:bg-[#6f9f8b] dark:hover:text-[#111111]"
                >
                  Discover more books
                  <FiArrowRight size={16} />
                </Link>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default FavouriteBooks;
