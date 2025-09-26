import React, { useState } from "react";
import Users from "../components/Users.jsx";
import Books from "../components/Books.jsx";
import Messages from "../components/Messages.jsx";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  const tabs = [
    { name: "Users", key: "users" },
    { name: "Books", key: "books" },
    { name: "Messages", key: "messages" },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
        Admin Panel
      </h2>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-6 justify-center sm:justify-start">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto
              ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md min-h-[60vh]">
        {activeTab === "users" && <Users />}
        {activeTab === "books" && <Books />}
        {activeTab === "messages" && <Messages />}
      </div>
    </div>
  );
};

export default AdminDashboard;
