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
        const res = await axios.get("http://localhost:4001/admin/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch messages");
      }
    };

    fetchMessages();
  }, [token]);

  // Function to format date & time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // formats as "MM/DD/YYYY, HH:MM:SS AM/PM"
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">User Messages</h3>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul>
          {messages.map((msg, i) => (
            <li key={i} className="border p-2 rounded mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>
                  <strong>{msg.user}</strong> ({msg.email})
                </span>
                <span>{formatDateTime(msg.createdAt)}</span>
              </div>
              <div>{msg.message}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;
