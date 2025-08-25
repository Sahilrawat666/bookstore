import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import Cards from "./Cards";

const Favourite = () => {
  const [authUser] = useAuth();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/book/favourites`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );
        setFavourites(res.data);
      } catch (err) {
        console.error("Failed to fetch favourites:", err);
      }
    };

    fetchFavourites();
  }, [authUser]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">My Favourite Books ❤️</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* {favourites.length > 0 ? (
          favourites.map((item) => <Cards key={item._id} item={item} />)
        ) : (
          <p>No favourites yet.</p>
        )} */}
      </div>
    </div>
  );
};

export default Favourite;
