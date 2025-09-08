import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("User");
      toast.success("Logout successfully");

      window.location.reload();
    } catch (error) {
      toast.error("Error:" + error.message);
    }
  };
  return (
    <div>
      <button
        className="px-3 py-1 sm:text-sm lg:text-lg text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
