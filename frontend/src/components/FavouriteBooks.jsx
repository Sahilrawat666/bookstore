// FavouriteBooks.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards.jsx";
import Navbar from "./Navbar.jsx";

function FavouriteBooks({ userId }) {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4001/user/favourites/${userId}`
        );
        setFavourites(res.data); // ✅ directly set array
      } catch (err) {
        console.error("Error fetching favourites:", err);
      }
    };
    fetchFavourites();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {favourites.length === 0 ? (
          <p>No favourite books yet.</p>
        ) : (
          favourites.map((book) => <Cards key={book.id} item={book} />)
        )}
      </div>
    </>
  );
}

export default FavouriteBooks;
