import React, { useEffect, useState } from "react";
import { FiSettings, FiShoppingCart, FiUser } from "react-icons/fi";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState("profile"); // track active tab

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // get JWT token
        if (!token) {
          setErrorMsg("User not logged in");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/get-user-information`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        if (error.response) {
          setErrorMsg(
            error.response.data.message || "Failed to fetch user info"
          );
        } else {
          setErrorMsg("Server error. Try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f7fafd]">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f7fafd]">
        <p className="text-red-500 text-lg">{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f7fafd] min-h-screen bg-gradient-to-r  dark:from-gray-800 dark:to-gray-900">
      <Navbar />

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center p-8 mt-13 sm:mt-15 md:px-8 lg:px-16  ">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
          <span className="text-white text-3xl font-bold ">
            {user.fullname ? user.fullname[0].toUpperCase() : "U"}
          </span>
        </div>
        <div className="ml-0 md:ml-5 mt-4 md:mt-0 text-center md:text-left">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
            {user.fullname}
          </h1>
          {/* <p className="text-gray-500">Member since January 2023</p> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-8 lg:px-16 ">
        {/* Sidebar */}
        <div className="w-full lg:w-60 mb-8 lg:mb-0">
          <div className="bg-white rounded-xl shadow-md mb-8 dark:bg-gray-700 ">
            <div className="divide-y ">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-4 py-3 text-left dark:text-white rounded-lg transition-all duration-300 ${
                  // class="w-full flex items-center px-4 py-3 text-left rounded-lg  border-l-4 border-blue-600"
                  activeTab === "profile"
                    ? "bg-blue-50 dark:bg-gray-500 transition-all duration-300 text-blue-600 dark:text-gray-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FiUser className="text-10 sm:text-[17px] mr-1" /> Profile
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center px-4 py-3 text-left dark:text-white rounded-lg transition-all duration-300 ${
                  activeTab === "orders"
                    ? "bg-blue-50 dark:bg-gray-500 transition-all duration-300 text-blue-600 dark:text-gray-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FiShoppingCart className="text-10 sm:text-[17px] mr-1" />{" "}
                Orders
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center px-4 py-3 text-left dark:text-white rounded-lg transition-all duration-300 ${
                  activeTab === "settings"
                    ? " bg-blue-50 dark:bg-gray-500 transition-all duration-300 text-blue-600 dark:text-gray-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FiSettings className="text-10 sm:text-[17px] mr-1" /> Settings
              </button>
            </div>
          </div>

          {/* User Insights */}
          <div className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-700 ">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              User Insights
            </h2>
            <div className="flex justify-between items-center mb-2 text-gray-600">
              <span>Favorites</span>
              <span className="text-red-600">
                {user.favourites?.length || 0}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2 text-gray-600">
              <span>Cart Items</span>
              <span className="text-blue-600">{user.carts?.length || 0}</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-gray-600">
              <span>Total Orders</span>
              <span className="text-gray-800 font-semibold">0</span>
            </div>
            <div className="flex justify-between items-center mt-4 text-gray-600">
              <span>Total Spent</span>
              <span className="text-green-600 font-semibold">0</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="flex-1 dark:bg-gray-700 ">
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl shadow-md p-6 md:p-10 dark:bg-gray-700 ">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Profile Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-500 mb-1">Full Name</label>
                  <p className="w-full bg-gray-100 rounded-lg px-4 py-2 border text-gray-700">
                    {user.fullname}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Email</label>
                  <p className="w-full bg-gray-100 rounded-lg px-4 py-2 border text-gray-700">
                    {user.email}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Phone</label>
                  <p className="w-full bg-gray-100 rounded-lg px-4 py-2 border text-gray-700">
                    {user.phone || "-"}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">
                    Member Since
                  </label>
                  <p className="w-full bg-gray-100 rounded-lg px-4 py-2 border text-gray-700">
                    January 2023
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-500 mb-1">Address</label>
                  <p className="w-full bg-gray-100 rounded-lg px-4 py-2 border text-gray-700">
                    {user.address || "-"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white rounded-xl shadow-md p-6 md:p-10 h-full dark:bg-gray-700 ">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Order History
              </h2>
              <p className="text-gray-600">No orders yet.</p>
              {/* Here you can map user.orders if available */}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white rounded-xl shadow-md p-6 md:p-10 dark:bg-gray-700 ">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Settings
              </h2>

              <div className="space-y-6">
                {/* Change Password */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Change Password
                  </h3>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-400 bg-gray-100"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-400 bg-gray-100"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-400 bg-gray-100 md:col-span-2"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg mt-2 md:col-span-2"
                    >
                      Update Password
                    </button>
                  </form>
                </div>

                {/* Notification Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Notification Preferences
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-500"
                      />
                      <span className="text-gray-700">Email Notifications</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-500"
                      />
                      <span className="text-gray-700">SMS Notifications</span>
                    </label>
                  </div>
                </div>

                {/* Account Deactivation */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Account
                  </h3>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg">
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;
