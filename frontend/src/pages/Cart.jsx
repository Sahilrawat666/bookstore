import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import { FaShoppingCart } from "react-icons/fa";

function Cart({ userId }) {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser, cartCount, setCartCount] = useAuth();
  const Navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const fetchCarts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/carts/${userId}`
        );
        setCarts(res.data);
      } catch (err) {
        console.error("Error fetching carts:", err);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, [userId]);

  // Remove from cart
  const removeFromCart = async (bookId) => {
    const id = authUser?._id || userId;
    if (!id) {
      toast.error("Please login first!");
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/carts/user/${id}/${bookId}`
      );

      setCarts((prev) => prev.filter((book) => book._id !== bookId));
      toast.success("Removed from cart!");
      setCartCount((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (err) {
      toast.error("Error removing book");
      console.error(err);
    }
  };

  const totalPrice = carts.reduce((sum, b) => sum + (b.price || 0), 0);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r mt-13 sm:mt-15 from-pink-200 via-purple-200 to-blue-200 dark:from-slate-800 dark:via-slate-900 dark:to-black py-12 mb-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3 text-gray-800 dark:text-white">
            <FaShoppingCart className="text-green-600 animate-bounce" />
            My Cart
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Review your selected books before checkout. Add or remove items as
            you like. 📚
          </p>
        </div>
      </div>

      {/* Cart Items */}
      <div className=" max-w-[1440px] mx-auto px-3 md:px-8 pb-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 animate-pulse">
              Loading cart...
            </p>
          </div>
        ) : carts.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
            <FaShoppingCart className="text-6xl text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Start adding books to your cart and find your next favorite read!
            </p>
            <button
              onClick={() => Navigate("/course")}
              className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {carts.map((book) => (
                <div
                  key={book._id}
                  className="flex shadow-lg bg-white dark:bg-[#1f2937] dark:border dark:border-gray-700 items-center justify-between rounded-lg p-4 transition hover:shadow-xl"
                >
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => Navigate(`/book/${book._id}`)}
                  >
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-20 h-28 object-contain rounded-md border border-gray-200 dark:border-gray-600"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {book.name}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {book.category}
                      </p>
                      <span className="text-blue-600 font-medium">
                        ${book.price}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(book._id);
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="rounded-lg p-6 shadow-md bg-gray-100 dark:bg-[#111827] dark:border dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Order Summary
              </h2>
              <p className="flex justify-between text-lg font-medium text-gray-700 dark:text-gray-300">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </p>
              <button
                className="w-full mt-6 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                onClick={() => toast.success("Proceeding to checkout...")}
              >
                Checkout
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                Secure checkout • 100% satisfaction guaranteed
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;
