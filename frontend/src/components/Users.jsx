import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Read user from localStorage
  const authUser = JSON.parse(localStorage.getItem("User"));
  console.log(authUser);

  // const token = localStorage.getItem("token"); // get JWT token

  const token = authUser?.token;

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        toast.error("No token found. Please login.");
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        //  Reverse array so newest is first
        setUsers(res.data.reverse());
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch users");
      }
    };

    fetchUsers();
  }, [token]);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admin/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedUsers = users.filter((u) => u._id !== id);
      setUsers(updatedUsers);

      toast.success("User deleted successfully ");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Users List
      </h3>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3">{user.fullname}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm shadow-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center px-4 py-6 text-gray-500 dark:text-gray-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
