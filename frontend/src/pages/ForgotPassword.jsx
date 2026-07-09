import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import image from "../assets/image.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/forgot-password`,
        { email },
      );

      toast.success(res.data.message);
      setEmail("");
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
            Forgot Password?
          </h2>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-8 text-sm">
            Enter your registered email address and we'll send you a password
            reset link.
          </p>

          {/* Email */}

          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-2 py-0.5 input input-bordered rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="btn w-full rounded-xl px-2 py-0.5 bg-blue-600 hover:bg-blue-700 border-none text-white text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Sending...
              </>
            ) : (
              "Send Reset Link"
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

export default ForgotPassword;
