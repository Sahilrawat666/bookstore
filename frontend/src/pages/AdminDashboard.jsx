import React, { useState } from "react";
import Users from "../components/Users.jsx";
import Books from "../components/Books.jsx";
import Messages from "../components/Messages.jsx";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <div className="flex space-x-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setActiveTab("books")}
        >
          Books
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setActiveTab("messages")}
        >
          Messages
        </button>
      </div>

      <div>
        {activeTab === "users" && <Users />}
        {activeTab === "books" && <Books />}
        {activeTab === "messages" && <Messages />}
      </div>
    </div>
  );
};

export default AdminDashboard;
