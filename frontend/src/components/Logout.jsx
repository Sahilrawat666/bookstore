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
        className="px-1 py-1 bg-red-500 text-white rounded-md cursor-pointer    "
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
