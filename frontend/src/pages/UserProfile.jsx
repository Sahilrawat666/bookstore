import React from "react";
import { FiShoppingCart, FiHeart, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem("User"));

  if (!authUser) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("User");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-2xl shadow-lg p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <img
              src={
                authUser.image || "https://via.placeholder.com/120?text=Profile"
              }
              alt="Profile"
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover shadow-md"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {authUser.fullname}
            </h2>
            <p className="text-gray-500 dark:text-gray-300">{authUser.email}</p>
            <p className="mt-1 text-gray-400 dark:text-gray-400 capitalize">
              Role: {authUser.role}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition duration-200"
          >
            <FiShoppingCart size={20} />
            My Cart
          </button>
          <button
            onClick={() => navigate("/favourites")}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition duration-200"
          >
            <FiHeart size={20} />
            Favourites
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow transition duration-200"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>

        {/* User Details */}
        <div className="mt-10 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Profile Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 dark:text-gray-300 font-medium">
                Full Name
              </p>
              <p className="text-gray-800 dark:text-gray-100">
                {authUser.fullname}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300 font-medium">
                Email
              </p>
              <p className="text-gray-800 dark:text-gray-100">
                {authUser.email}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300 font-medium">
                Role
              </p>
              <p className="text-gray-800 dark:text-gray-100">
                {authUser.role}
              </p>
            </div>
            {/* Add more details here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
