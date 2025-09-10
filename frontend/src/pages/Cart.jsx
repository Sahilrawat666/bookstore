import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";

function Cart({ userId }) {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // remove from cart
  const removeFromCart = async (bookId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/cart`, {
        data: { userId, bookId },
      });
      setCarts((prev) => prev.filter((b) => b._id !== bookId));
      toast.success("Removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove book");
    }
  };

  const totalPrice = carts.reduce((sum, b) => sum + (b.price || 0), 0);

  return (
    <>
      <Navbar />
      <div className=" min-h-screen sm:mt-13 md:mt-15 lg:mt-17 max-w-[1440px] mx-auto mt-20 px-10 pt-6 ">
        <h1 className="text-3xl font-bold mb-6">My Cart</h1>

        {loading ? (
          <p className="text-center">Loading cart...</p>
        ) : carts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4 ">
              {carts.map((book) => (
                <div
                  key={book._id}
                  className="flex shadow-lg bg-slate-100 items-center justify-between  rounded-lg p-4 shadow-sm dark:bg-[#f4f4f430] dark:border-gray-700"
                  onClick={() => Navigate(`/book/${book._id}`)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-20 h-28 object-contain"
                    />
                    <div>
                      <h2 className="text-lg font-semibold dark:text-gray-300">
                        {book.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {book.category}
                      </p>
                      <span className="text-blue-600 font-medium">
                        ${book.price}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(book._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className=" rounded-lg p-6 shadow-md bg-gray-100 dark:bg-[#73737394] dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <p className="flex justify-between text-lg font-medium">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </p>
              <button
                className="w-full mt-6 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                onClick={() => toast.success("Proceeding to checkout...")}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
