// FavouriteBooks.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/Cards.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function FavouriteBooks({ userId }) {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/favourites/${userId}`
        );
        setFavourites(res.data); // ✅ directly set array
      } catch (err) {
        console.error("Error fetching favourites:", err);
      }
    };
    fetchFavourites();
  }, [userId]);

  // remove from favourite
  // const removeFavourite = async (bookId) => {
  //   try {
  //     const res = await axios.delete(
  //       `${import.meta.env.VITE_BACKEND_URL}/user/favourites/${userId}/${bookId}`
  //     );
  //     setFavourites(res.data.favourites);
  //     toast.success("Removed from favourites");
  //   } catch (err) {
  //     toast.error("Error removing book");
  //     console.error(err);
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-slate-100 dark:bg-slate-900 px-3 md:px-8">
        <div className="grid m-auto max-w-[1440px] mt-13  lg:mt-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {favourites.length === 0 ? (
            <p>No favourite books yet.</p>
          ) : (
            favourites.map((book) => (
              <Cards
                key={book._id}
                item={book}
                type="favourite" //  tell the card what page it’s in
                onRemove={(bookId) => {
                  setFavourites((prev) => prev.filter((b) => b._id !== bookId));
                }}
              />
            ))
          )}
          {/* <button
            onClick={() => removeFavourite(book._id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FavouriteBooks;
