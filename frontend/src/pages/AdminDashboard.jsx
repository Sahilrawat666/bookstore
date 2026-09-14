import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiBookOpen, FiMessageSquare, FiUsers } from "react-icons/fi";
import Users from "../components/Users.jsx";
import Books from "../components/AdminBooks.jsx";
import Messages from "../components/Messages.jsx";

const tabs = [
  {
    name: "Users",
    key: "users",
    icon: FiUsers,
    description: "Manage registered customers",
  },
  {
    name: "Books",
    key: "books",
    icon: FiBookOpen,
    description: "Manage your catalogue",
  },
  {
    name: "Messages",
    key: "messages",
    icon: FiMessageSquare,
    description: "Review customer enquiries",
  },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  const activeTabData = tabs.find((tab) => tab.key === activeTab) || tabs[0];

  return (
    <div className="min-h-screen bg-white text-[#171717] dark:bg-[#111111] dark:text-[#f5f5f5]">
      <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-7 border-b border-[#e5e5e5] pb-6 dark:border-[#303030]"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#315c4c] dark:text-[#6f9f8b]">
                Administration
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Admin dashboard
              </h1>
            </div>

            <p className="max-w-md text-sm leading-6 text-[#666666] dark:text-[#a3a3a3] sm:text-right">
              Manage customers, catalogue content and customer messages from one
              workspace.
            </p>
          </div>
        </motion.header>

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav
            aria-label="Admin sections"
            className="h-fit border border-[#e5e5e5] bg-[#f7f7f5] p-2 dark:border-[#303030] dark:bg-[#181818]"
          >
            <div className="mb-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#666666] dark:text-[#a3a3a3]">
              Workspace
            </div>

            <div className="flex gap-1 overflow-x-auto lg:block lg:overflow-visible">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-w-[145px] flex-1 items-center gap-3 border px-3 py-3 text-left transition-colors lg:min-w-0 ${isActive ? "border-[#315c4c] bg-white text-[#315c4c] dark:border-[#6f9f8b] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]" : "border-transparent text-[#666666] hover:border-[#e5e5e5] hover:bg-white hover:text-[#171717] dark:text-[#a3a3a3] dark:hover:border-[#303030] dark:hover:bg-[#1d1d1d] dark:hover:text-[#f5f5f5]"}`}
                  >
                    <Icon className="shrink-0 text-lg" aria-hidden="true" />

                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">
                        {tab.name}
                      </span>

                      <span className="mt-0.5 hidden text-xs leading-5 lg:block">
                        {tab.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          <motion.section
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            aria-labelledby="admin-section-title"
            className="min-w-0 border border-[#e5e5e5] bg-white dark:border-[#303030] dark:bg-[#181818]"
          >
            <div className="flex flex-col gap-1 border-b border-[#e5e5e5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-[#303030] sm:px-6">
              <div>
                <h2 id="admin-section-title" className="text-lg font-semibold">
                  {activeTabData.name}
                </h2>

                <p className="text-sm text-[#666666] dark:text-[#a3a3a3]">
                  {activeTabData.description}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {activeTab === "users" && <Users />}
              {activeTab === "books" && <Books />}
              {activeTab === "messages" && <Messages />}
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
