import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiTrash2, FiUsers } from "react-icons/fi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        toast.error("No token found. Please login as admin.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUsers([...res.data].reverse());
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUsers((currentUsers) =>
        currentUsers.filter((user) => user._id !== id),
      );

      toast.success("User deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <section className="w-full">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center border border-[#e5e5e5] bg-[#f7f7f5] text-[#315c4c] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]">
          <FiUsers aria-hidden="true" />
        </div>

        <div>
          <h3 className="text-base font-semibold">Registered users</h3>
          <p className="text-sm text-[#666666] dark:text-[#a3a3a3]">
            View and manage customer accounts.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-14 animate-pulse border border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]"
            />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="border border-dashed border-[#e5e5e5] px-6 py-12 text-center dark:border-[#303030]">
          <FiUsers
            className="mx-auto mb-3 text-2xl text-[#666666] dark:text-[#a3a3a3]"
            aria-hidden="true"
          />
          <p className="font-medium">No users found</p>
          <p className="mt-1 text-sm text-[#666666] dark:text-[#a3a3a3]">
            Registered customers will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden border border-[#e5e5e5] dark:border-[#303030]">
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="border-b border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Joined</th>
                  <th className="px-4 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#e5e5e5] dark:divide-[#303030]">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="transition-colors hover:bg-[#f7f7f5] dark:hover:bg-[#1d1d1d]"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#315c4c] text-xs font-semibold text-white dark:bg-[#6f9f8b] dark:text-[#111111]">
                          {(user.fullname || "U").charAt(0).toUpperCase()}
                        </div>

                        <span className="font-medium text-[#171717] dark:text-[#f5f5f5]">
                          {user.fullname || "Unknown user"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-[#666666] dark:text-[#a3a3a3]">
                      {user.email}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-semibold ${user.role === "admin" ? "bg-[#315c4c]/10 text-[#315c4c] dark:bg-[#6f9f8b]/10 dark:text-[#6f9f8b]" : "bg-[#f7f7f5] text-[#666666] dark:bg-[#1d1d1d] dark:text-[#a3a3a3]"}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-[#666666] dark:text-[#a3a3a3]">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>

                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(user._id)}
                        className="inline-flex items-center gap-2 border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
                        aria-label={`Delete ${user.fullname || "user"}`}
                      >
                        <FiTrash2 aria-hidden="true" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default Users;
