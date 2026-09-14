import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiAlertCircle,
  FiBookOpen,
  FiCalendar,
  FiPackage,
} from "react-icons/fi";

function ProfileOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/orders/profileOrders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setOrders(res.data);
      } catch (err) {
        console.error("ERROR:", err);
        setError("Unable to load your orders right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="border border-[#e5e5e5] bg-white p-5 dark:border-[#303030] dark:bg-[#181818]"
          >
            <div className="animate-pulse space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="h-4 w-32 bg-[#e5e5e5] dark:bg-[#303030]" />
                <div className="h-4 w-20 bg-[#e5e5e5] dark:bg-[#303030]" />
              </div>
              <div className="h-px bg-[#e5e5e5] dark:bg-[#303030]" />
              <div className="flex gap-3">
                <div className="h-14 w-12 bg-[#e5e5e5] dark:bg-[#303030]" />
                <div className="space-y-2">
                  <div className="h-3 w-40 bg-[#e5e5e5] dark:bg-[#303030]" />
                  <div className="h-3 w-20 bg-[#e5e5e5] dark:bg-[#303030]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-6 dark:border-red-900/40 dark:bg-red-950/20">
        <div className="flex items-start gap-3">
          <FiAlertCircle
            className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
            size={19}
          />
          <div>
            <h3 className="text-sm font-semibold text-red-700 dark:text-red-400">
              Unable to load orders
            </h3>
            <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/80">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="border border-[#e5e5e5] bg-white px-6 py-14 text-center dark:border-[#303030] dark:bg-[#181818]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center bg-[#f7f7f5] text-[#315c4c] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]">
          <FiPackage size={21} />
        </div>
        <h3 className="mt-5 text-lg font-semibold">No orders yet</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
          Your completed purchases will appear here once you place your first
          order.
        </p>
      </div>
    );
  }

  const getStatusClasses = (status) => {
    if (status === "Delivered") {
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-900/40 dark:bg-green-950/20 dark:text-green-400";
    }

    if (status === "Pending") {
      return "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/40 dark:bg-yellow-950/20 dark:text-yellow-400";
    }

    return "border-[#e5e5e5] bg-[#f7f7f5] text-[#666666] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#a3a3a3]";
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <article
          key={order._id}
          className="border border-[#e5e5e5] bg-white dark:border-[#303030] dark:bg-[#181818]"
        >
          <div className="flex flex-col gap-4 border-b border-[#e5e5e5] p-5 dark:border-[#303030] sm:flex-row sm:items-start sm:justify-between sm:p-6">
            <div className="min-w-0">
              <p className="mb-1 text-xs uppercase tracking-wider text-[#999999]">
                Order ID
              </p>
              <p className="break-all text-sm font-medium">{order._id}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-[#666666] dark:text-[#a3a3a3]">
                <FiCalendar size={14} />
                {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <div className="text-left sm:text-right">
                <p className="mb-1 text-xs uppercase tracking-wider text-[#999999]">
                  Total
                </p>
                <p className="text-lg font-semibold">₹{order.totalAmount}</p>
              </div>

              <span
                className={`border px-3 py-1.5 text-xs font-medium ${getStatusClasses(order.status)}`}
              >
                {order.status || "Processing"}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-[#999999]">
              Items
            </p>

            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-11 shrink-0 border border-[#e5e5e5] object-cover dark:border-[#303030]"
                      />
                    ) : (
                      <div className="flex h-14 w-11 shrink-0 items-center justify-center border border-[#e5e5e5] text-[#999999] dark:border-[#303030]">
                        <FiBookOpen size={17} />
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-[#666666] dark:text-[#a3a3a3]">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 text-sm font-medium">₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ProfileOrders;
