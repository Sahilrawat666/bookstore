import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiMail, FiMessageSquare } from "react-icons/fi";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      if (!token) {
        toast.error("Please login as admin.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setMessages([...res.data].reverse());
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch messages",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token]);

  const formatDateTime = (dateString) => {
    if (!dateString) {
      return "Unknown date";
    }

    return new Date(dateString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="w-full">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center border border-[#e5e5e5] bg-[#f7f7f5] text-[#315c4c] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]">
          <FiMessageSquare aria-hidden="true" />
        </div>

        <div>
          <h3 className="text-base font-semibold">Customer messages</h3>
          <p className="text-sm text-[#666666] dark:text-[#a3a3a3]">
            Review enquiries submitted through the store.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse border border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]"
            />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="border border-dashed border-[#e5e5e5] px-6 py-12 text-center dark:border-[#303030]">
          <FiMail
            className="mx-auto mb-3 text-2xl text-[#666666] dark:text-[#a3a3a3]"
            aria-hidden="true"
          />
          <p className="font-medium">No messages yet</p>
          <p className="mt-1 text-sm text-[#666666] dark:text-[#a3a3a3]">
            Customer enquiries will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message, index) => (
            <article
              key={message._id || index}
              className="border border-[#e5e5e5] p-4 transition-colors hover:bg-[#f7f7f5] dark:border-[#303030] dark:hover:bg-[#1d1d1d] sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#315c4c] text-sm font-semibold text-white dark:bg-[#6f9f8b] dark:text-[#111111]">
                    {(message.user || "U").charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold">
                      {message.user || "Unknown user"}
                    </p>

                    <p className="mt-0.5 truncate text-sm text-[#666666] dark:text-[#a3a3a3]">
                      {message.email || "No email provided"}
                    </p>
                  </div>
                </div>

                <time className="shrink-0 text-xs text-[#666666] dark:text-[#a3a3a3]">
                  {formatDateTime(message.createdAt)}
                </time>
              </div>

              <div className="mt-4 border-t border-[#e5e5e5] pt-4 dark:border-[#303030]">
                <p className="whitespace-pre-wrap text-sm leading-6 text-[#444444] dark:text-[#d4d4d4]">
                  {message.message}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Messages;
