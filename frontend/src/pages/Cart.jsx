import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import {
  MdArrowForward,
  MdDeleteOutline,
  MdLockOutline,
  MdRemoveShoppingCart,
  MdShoppingCart,
} from "react-icons/md";

function Cart({ userId }) {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authUser, , , setCartCount] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchCarts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/carts/${userId}`,
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

  const removeFromCart = async (bookId) => {
    const id = authUser?._id || userId;

    if (!id) {
      toast.error("Please login first!");
      return;
    }

    const toastId = toast.loading("Removing book from cart...");

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/carts/user/${id}/${bookId}`,
      );

      setCarts((prev) => prev.filter((book) => book._id !== bookId));
      setCartCount((prev) => (prev > 0 ? prev - 1 : 0));
      toast.success("Removed from cart!", { id: toastId });
    } catch (err) {
      toast.error("Error removing book", { id: toastId });
      console.error(err);
    }
  };

  const totalPrice = carts.reduce((sum, book) => sum + (book.price || 0), 0);
  const tax = totalPrice * 0.05;
  const shipping = totalPrice > 0 ? 5 : 0;
  const total = totalPrice + tax + shipping;

  return (
    <>
      <main className="min-h-screen bg-white pt-20 dark:bg-[#111111]">
        <section className="border-b border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#181818]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#d9d9d9] bg-white text-[#315c4c] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]">
                <MdShoppingCart size={24} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#315c4c] dark:text-[#6f9f8b]">
                  Your shopping bag
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#171717] dark:text-[#f5f5f5]">
                  My Cart
                </h1>

                <p className="mt-2 text-sm text-[#666666] dark:text-[#a3a3a3]">
                  Review your selected books before placing your order.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-32 animate-pulse border border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]"
                  />
                ))}
              </div>

              <div className="h-80 animate-pulse border border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]" />
            </div>
          ) : carts.length === 0 ? (
            <div className="flex min-h-[430px] flex-col items-center justify-center border border-dashed border-[#d9d9d9] px-6 text-center dark:border-[#303030]">
              <div className="flex h-16 w-16 items-center justify-center border border-[#e5e5e5] text-[#999999] dark:border-[#303030] dark:text-[#666666]">
                <MdRemoveShoppingCart size={31} />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-[#171717] dark:text-[#f5f5f5]">
                Your cart is empty
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
                You haven't added any books yet. Browse our collection and find
                something worth reading.
              </p>

              <button
                type="button"
                onClick={() => navigate("/books")}
                className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-[#315c4c] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#274c3f] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
              >
                Browse Books
                <MdArrowForward size={18} />
              </button>
            </div>
          ) : (
            <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
              <div>
                <div className="mb-5 flex items-center justify-between border-b border-[#e5e5e5] pb-4 dark:border-[#303030]">
                  <div>
                    <h2 className="text-lg font-semibold text-[#171717] dark:text-[#f5f5f5]">
                      Cart Items
                    </h2>
                    <p className="mt-1 text-xs text-[#666666] dark:text-[#a3a3a3]">
                      {carts.length} {carts.length === 1 ? "book" : "books"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {carts.map((book) => (
                    <article
                      key={book._id}
                      className="flex gap-4 border border-[#e5e5e5] bg-white p-4 transition-colors hover:border-[#cfcfcf] dark:border-[#303030] dark:bg-[#1d1d1d] dark:hover:border-[#444444]"
                    >
                      <button
                        type="button"
                        onClick={() => navigate(`/book/${book._id}`)}
                        className="flex h-28 w-20 shrink-0 items-center justify-center bg-[#f7f7f5] p-2 dark:bg-[#181818]"
                      >
                        <img
                          src={book.image}
                          alt={book.name}
                          className="h-full w-full object-contain"
                        />
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => navigate(`/book/${book._id}`)}
                            className="min-w-0 text-left"
                          >
                            <h3 className="truncate text-base font-semibold text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b]">
                              {book.name}
                            </h3>
                            <p className="mt-1 truncate text-sm text-[#666666] dark:text-[#a3a3a3]">
                              {book.title}
                            </p>
                          </button>

                          <button
                            type="button"
                            onClick={() => removeFromCart(book._id)}
                            aria-label={`Remove ${book.name} from cart`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[#888888] transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/20 dark:hover:text-red-400"
                          >
                            <MdDeleteOutline size={20} />
                          </button>
                        </div>

                        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                          <span className="border border-[#e5e5e5] px-2 py-1 text-xs text-[#666666] dark:border-[#303030] dark:text-[#a3a3a3]">
                            {book.category}
                          </span>

                          <p className="text-base font-semibold text-[#171717] dark:text-[#f5f5f5]">
                            {book.price === 0
                              ? "Free"
                              : `$${Number(book.price).toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="border border-[#e5e5e5] bg-[#f7f7f5] p-6 dark:border-[#303030] dark:bg-[#181818]">
                <h2 className="text-xl font-semibold text-[#171717] dark:text-[#f5f5f5]">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center justify-between text-[#666666] dark:text-[#a3a3a3]">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between text-[#666666] dark:text-[#a3a3a3]">
                    <span>Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between text-[#666666] dark:text-[#a3a3a3]">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-[#d9d9d9] pt-4 dark:border-[#303030]">
                    <div className="flex items-center justify-between text-base font-semibold text-[#171717] dark:text-[#f5f5f5]">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/checkout")}
                  className="mt-7 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#315c4c] text-sm font-semibold text-white transition-colors hover:bg-[#274c3f] active:scale-[0.99] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
                >
                  Proceed to Checkout
                  <MdArrowForward size={18} />
                </button>

                <div className="mt-6 border-t border-[#d9d9d9] pt-5 dark:border-[#303030]">
                  <div className="flex gap-3">
                    <MdLockOutline
                      className="mt-0.5 shrink-0 text-[#315c4c] dark:text-[#6f9f8b]"
                      size={19}
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#171717] dark:text-[#f5f5f5]">
                        Secure checkout
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#666666] dark:text-[#a3a3a3]">
                        Your order information is handled securely.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Cart;
