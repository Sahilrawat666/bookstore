import React, { useEffect, useState } from "react";
import axios from "axios";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:4001/admin/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [token]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">User Messages</h3>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul>
          {messages.map((msg, i) => (
            <li key={i} className="border p-2 rounded mb-2">
              <strong>
                {msg.user} ({msg.email}):
              </strong>{" "}
              {msg.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;
