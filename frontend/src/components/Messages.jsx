import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const authUser = JSON.parse(localStorage.getItem("User")); // get logged-in admin
  const token = authUser?.token; // extract token

  useEffect(() => {
    const fetchMessages = async () => {
      if (!token) {
        toast.error("No token found. Please login as admin.");
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/messages`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Reverse messages so newest are on top
        setMessages(res.data.reverse());
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch messages");
      }
    };

    fetchMessages();
  }, [token]);

  // Format date & time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // "MM/DD/YYYY, HH:MM:SS AM/PM"
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        User Messages
      </h3>

      {messages.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No messages yet.</p>
      ) : (
        <ul className="space-y-3">
          {messages.map((msg, i) => (
            <li
              key={i}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-all bg-white dark:bg-gray-800"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {msg.user} ({msg.email})
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDateTime(msg.createdAt)}
                </span>
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                {msg.message}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;
