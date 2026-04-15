import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthProvider.jsx";

function Checkout() {
  const navigate = useNavigate();
  const [authUser, setAuthUser, cartCount, setCartCount] = useAuth();

  const userId = authUser?._id;
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  // Fetch cart
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
      return;
    }

    if (!userId) return;

    const fetchCarts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/carts/${userId}`,
        );
        setCarts(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load cart");
      }
    };

    fetchCarts();
  }, [authUser, userId, navigate]);

  //  Pricing
  const subtotal = carts.reduce((sum, item) => sum + (item.price || 0), 0);
  const tax = subtotal * 0.05;
  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + tax + shipping;

  //  Place Order
  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);

    try {
      const orderItems = carts.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
      }));

      //  SEND ORDER
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
        userId,
        address: data,
        items: orderItems,
        total,
      });

      toast.success("Order placed successfully");
      setCarts([]);
      setCartCount(0);

      navigate("/cart");
    } catch (err) {
      console.error(err);
      toast.error("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-4 pt-20 grid md:grid-cols-2 gap-6">
        {/* LEFT - FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-xl p-6 space-y-4"
        >
          <h2 className="text-xl font-bold">Shipping Details</h2>

          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            {...register("phone", { required: true })}
            placeholder="Phone"
            className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            {...register("address", { required: true })}
            placeholder="Address"
            className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            {...register("city", { required: true })}
            placeholder="City"
            className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            {...register("pincode", { required: true })}
            placeholder="Pincode"
            className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {carts.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
