import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  MdArrowBack,
  MdCheckCircleOutline,
  MdLockOutline,
  MdShoppingBag,
} from "react-icons/md";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthProvider.jsx";

function Checkout() {
  const navigate = useNavigate();
  const [authUser, , , setCartCount] = useAuth();

  const userId = authUser?._id;
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCart, setFetchingCart] = useState(true);
  const [isBuyNow, setIsBuyNow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
      return;
    }

    const storedItem = JSON.parse(localStorage.getItem("buyNowItem"));

    if (storedItem) {
      setCarts([storedItem]);
      setIsBuyNow(true);
      setFetchingCart(false);
      return;
    }

    if (!userId) {
      setFetchingCart(false);
      return;
    }

    const fetchCarts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/carts/${userId}`,
        );
        setCarts(res.data);
        setIsBuyNow(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load cart");
      } finally {
        setFetchingCart(false);
      }
    };

    fetchCarts();
  }, [authUser, userId, navigate]);

  const subtotal = carts.reduce((sum, item) => sum + (item.price || 0), 0);
  const tax = subtotal * 0.05;
  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + tax + shipping;

  const onSubmit = async (data) => {
    if (loading || carts.length === 0) return;

    setLoading(true);

    try {
      const orderItems = carts.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
      }));

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
        userId,
        address: data,
        items: orderItems,
        total,
        mode: isBuyNow ? "buyNow" : "cart",
      });

      if (isBuyNow) {
        localStorage.removeItem("buyNowItem");
      } else {
        setCarts([]);
        setCartCount(0);
      }

      toast.success("Order placed successfully");
      navigate("/user?tab=orders");
    } catch (err) {
      console.error(err);
      toast.error("Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingCart) {
    return (
      <>
        <main className="min-h-screen bg-white px-4 pt-24 dark:bg-[#111111]">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
              <div className="h-[500px] animate-pulse border border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]" />
              <div className="h-[400px] animate-pulse border border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]" />
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!carts.length) {
    return (
      <>
        <main className="flex min-h-screen items-center justify-center bg-white px-4  dark:bg-[#111111]">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#e5e5e5] text-[#999999] dark:border-[#303030] dark:text-[#666666]">
              <MdShoppingBag size={27} />
            </div>

            <h1 className="mt-5 text-2xl font-semibold text-[#171717] dark:text-[#f5f5f5]">
              Nothing to checkout
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
              Add a book to your cart before proceeding to checkout.
            </p>

            <button
              type="button"
              onClick={() => navigate("/books")}
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-[#315c4c] px-5 text-sm font-semibold text-white hover:bg-[#274c3f] dark:bg-[#6f9f8b] dark:text-[#111111]"
            >
              <MdArrowBack size={18} />
              Browse Books
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-white  dark:bg-[#111111]">
        <section className="border-b border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#181818]">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-5 inline-flex items-center gap-2 text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
            >
              <MdArrowBack size={18} />
              Back
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#315c4c] dark:text-[#6f9f8b]">
              {isBuyNow ? "Direct purchase" : "Your order"}
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#171717] dark:text-[#f5f5f5]">
              Checkout
            </h1>

            <p className="mt-2 text-sm text-[#666666] dark:text-[#a3a3a3]">
              Enter your delivery details to complete your order.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border border-[#e5e5e5] bg-white p-6 dark:border-[#303030] dark:bg-[#1d1d1d] sm:p-8"
            >
              <div className="flex items-center gap-3 border-b border-[#e5e5e5] pb-5 dark:border-[#303030]">
                <div className="flex h-9 w-9 items-center justify-center bg-[#f7f7f5] text-[#315c4c] dark:bg-[#181818] dark:text-[#6f9f8b]">
                  <MdCheckCircleOutline size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#171717] dark:text-[#f5f5f5]">
                    Shipping Details
                  </h2>
                  <p className="mt-1 text-xs text-[#666666] dark:text-[#a3a3a3]">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="mb-2 block text-sm font-medium text-[#171717] dark:text-[#f5f5f5]"
                  >
                    Full Name
                  </label>

                  <input
                    id="checkout-name"
                    {...register("name", { required: "Full name is required" })}
                    placeholder="Enter your full name"
                    className="h-11 w-full rounded-md border border-[#d9d9d9] bg-white px-3 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#999999] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5] dark:placeholder:text-[#777777] dark:focus:border-[#6f9f8b]"
                  />

                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="mb-2 block text-sm font-medium text-[#171717] dark:text-[#f5f5f5]"
                  >
                    Phone
                  </label>

                  <input
                    id="checkout-phone"
                    type="tel"
                    {...register("phone", { required: "Phone is required" })}
                    placeholder="Enter your phone number"
                    className="h-11 w-full rounded-md border border-[#d9d9d9] bg-white px-3 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#999999] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5] dark:placeholder:text-[#777777] dark:focus:border-[#6f9f8b]"
                  />

                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="checkout-address"
                    className="mb-2 block text-sm font-medium text-[#171717] dark:text-[#f5f5f5]"
                  >
                    Address
                  </label>

                  <textarea
                    id="checkout-address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    placeholder="Enter your delivery address"
                    rows={4}
                    className="w-full resize-none rounded-md border border-[#d9d9d9] bg-white px-3 py-3 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#999999] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5] dark:placeholder:text-[#777777] dark:focus:border-[#6f9f8b]"
                  />

                  {errors.address && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="checkout-city"
                      className="mb-2 block text-sm font-medium text-[#171717] dark:text-[#f5f5f5]"
                    >
                      City
                    </label>

                    <input
                      id="checkout-city"
                      {...register("city", { required: "City is required" })}
                      placeholder="City"
                      className="h-11 w-full rounded-md border border-[#d9d9d9] bg-white px-3 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#999999] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5] dark:placeholder:text-[#777777] dark:focus:border-[#6f9f8b]"
                    />

                    {errors.city && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-pincode"
                      className="mb-2 block text-sm font-medium text-[#171717] dark:text-[#f5f5f5]"
                    >
                      Pincode
                    </label>

                    <input
                      id="checkout-pincode"
                      inputMode="numeric"
                      {...register("pincode", {
                        required: "Pincode is required",
                      })}
                      placeholder="Pincode"
                      className="h-11 w-full rounded-md border border-[#d9d9d9] bg-white px-3 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#999999] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5] dark:placeholder:text-[#777777] dark:focus:border-[#6f9f8b]"
                    />

                    {errors.pincode && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.pincode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#315c4c] text-sm font-semibold text-white transition-colors hover:bg-[#274c3f] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
              >
                <MdCheckCircleOutline size={19} />
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#666666] dark:text-[#a3a3a3]">
                <MdLockOutline size={17} className="mt-0.5 shrink-0" />
                <p>Your order details are submitted securely.</p>
              </div>
            </form>

            <aside className="border border-[#e5e5e5] bg-[#f7f7f5] p-6 dark:border-[#303030] dark:bg-[#181818] lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold text-[#171717] dark:text-[#f5f5f5]">
                Order Summary
              </h2>

              <div className="mt-6 max-h-72 space-y-4 overflow-y-auto pr-1">
                {carts.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <div className="flex h-16 w-12 shrink-0 items-center justify-center bg-white p-1 dark:bg-[#1d1d1d]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#171717] dark:text-[#f5f5f5]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-[#666666] dark:text-[#a3a3a3]">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>

                    <p className="text-sm font-medium text-[#171717] dark:text-[#f5f5f5]">
                      ${Number(item.price || 0).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-[#d9d9d9] pt-5 dark:border-[#303030]">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-[#666666] dark:text-[#a3a3a3]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-[#666666] dark:text-[#a3a3a3]">
                    <span>Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-[#666666] dark:text-[#a3a3a3]">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#d9d9d9] pt-5 dark:border-[#303030]">
                  <div className="flex justify-between text-lg font-semibold text-[#171717] dark:text-[#f5f5f5]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}

export default Checkout;
