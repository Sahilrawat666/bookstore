import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaBookOpen, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import image from "../assets/image.png";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/reset-password/${token}`,
        {
          password,
        },
      );

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-200 dark:border-slate-700 transition-all duration-300 hover:shadow-blue-300/40"
        >
          {/* Icon */}
          <div className="flex justify-center mb-3">
            <img
              src={image}
              alt="Logo"
              className="h-full w-50  object-contain scale-110  "
            />
          </div>

          {/* Heading */}

          <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white">
            Reset Password
          </h2>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-8 text-sm">
            Create a new secure password for your account.
          </p>

          {/* New Password */}

          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="input input-bordered px-2 py-0.5 w-full rounded-xl pr-12 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className="input input-bordered w-full px-2 py-0.5 rounded-xl pr-12 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Button */}

          <button
            className="btn w-full rounded-xl px-2 py-0.5 bg-blue-600 hover:bg-blue-700 border-none text-white text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Updating...
              </>
            ) : (
              "Reset Password"
            )}
          </button>

          {/* Back */}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition duration-300 hover:gap-3"
            >
              <FaArrowLeft />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
