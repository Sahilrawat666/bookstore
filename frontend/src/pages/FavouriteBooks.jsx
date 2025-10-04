import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/Cards.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { FaHeart } from "react-icons/fa";

function FavouriteBooks({ userId }) {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/favourites/${userId}`
        );

        setFavourites(res.data); //  directly set array
      } catch (err) {
        console.error("Error fetching favourites:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, [userId]);

  return (
    <>
      <Navbar />

      {/*  Hero Section */}
      <div className="relative mt-13 sm:mt-15 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:from-slate-800 dark:via-slate-900 dark:to-black py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white flex items-center justify-center ">
            <FaHeart className="text-pink-500 animate-bounce" />
            Your Favourite Books
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here's your handpicked collection of books you love the most. Keep
            exploring, keep reading, and build your personalized library. 💖
          </p>
        </div>
      </div>

      {/*  Books Section */}
      <div className="w-full  bg-slate-100 dark:bg-slate-900 px-3 md:px-8 py-12">
        <div className="grid m-auto max-w-[1440px] grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {loading ? (
            <div className="flex justify-center items-center col-span-full min-h-[300px]">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 animate-pulse">
                Loading your favourite books...
              </p>
            </div>
          ) : favourites.length === 0 ? (
            <div className="flex flex-col justify-center items-center col-span-full min-h-[300px] text-center">
              <FaHeart className="text-5xl text-pink-400 mb-4 animate-pulse" />
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                No favourite books yet.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Start adding books to your favourites and build your reading
                list.
              </p>
              <button
                onClick={() => Navigate("/books")}
                className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 active:scale-90 transition transform duration-150"
              >
                Browse Books
              </button>
            </div>
          ) : (
            favourites.map((book) => (
              <Cards
                key={book._id}
                item={book}
                type="favourite"
                onRemove={(bookId) =>
                  setFavourites((prev) => prev.filter((b) => b._id !== bookId))
                }
              />
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FavouriteBooks;
