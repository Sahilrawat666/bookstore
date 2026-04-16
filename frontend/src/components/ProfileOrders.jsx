import { useEffect, useState } from "react";
import axios from "axios";

function ProfileOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/orders/profileOrders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("ORDERS:", res.data); // 🔥 always check this
        setOrders(res.data);
      } catch (err) {
        console.error("ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  return (
    <div className="space-y-5">
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition p-5"
          >
            {/* TOP ROW */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
              <div>
                <p className="text-xs text-gray-400">Order ID</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 break-all">
                  {order._id}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="font-semibold text-green-600">
                    ₹{order.totalAmount}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.status || "Processing"}
                </span>
              </div>
            </div>

            {/* DATE */}
            <p className="text-xs text-gray-500 mb-4">
              {new Date(order.createdAt).toLocaleString()}
            </p>

            {/* ITEMS */}
            <div className="border-t pt-4 space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md border"
                      />
                    )}

                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-200">
                        {item.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-medium text-gray-700 dark:text-gray-200">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProfileOrders;
