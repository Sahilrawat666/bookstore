// FavouriteBooks.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards.jsx";
import Navbar from "./Navbar.jsx";

function Cart({ userId }) {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const res = await axios.get(
          `${window.location.origin}/user/carts/${userId}`
        );
        setCarts(res.data); // ✅ directly set array
      } catch (err) {
        console.error("Error fetching carts:", err);
      }
    };
    fetchCarts();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {carts.length === 0 ? (
          <p>No books in your cart.</p>
        ) : (
          carts.map((book) => <Cards key={book.id} item={book} />)
        )}
      </div>
    </>
  );
}

export default Cart;
