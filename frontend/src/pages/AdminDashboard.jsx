import React, { useState } from "react";
import Users from "../components/Users.jsx";
import Books from "../components/AdminBooks.jsx";
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center md:text-left">
          Admin Dashboard
        </h2>
        <p className="text-gray-500 text-center md:text-right mt-2 md:mt-0">
          Manage users, books & messages in one place
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-sm w-full sm:w-auto
              ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white hover:scale-105"
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl min-h-[65vh] transition-all duration-500 ease-in-out border border-gray-200 dark:border-gray-700">
        {activeTab === "users" && (
          <div className="animate-fadeIn">
            <Users />
          </div>
        )}
        {activeTab === "books" && (
          <div className="animate-fadeIn">
            <Books />
          </div>
        )}
        {activeTab === "messages" && (
          <div className="animate-fadeIn">
            <Messages />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
