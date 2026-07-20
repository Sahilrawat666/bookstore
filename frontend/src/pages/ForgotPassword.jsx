import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaShieldAlt } from "react-icons/fa";
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
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-3xl shadow-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-400/20"
        >
          {/* Logo */}

          <div className="flex justify-center mb-4">
            <img src={image} alt="BookStore" className="w-48 object-contain" />
          </div>

          {/* Heading */}

          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Forgot Password?
          </h2>

          <p className="mt-3 text-center text-gray-500 dark:text-gray-400 text-sm leading-6">
            Enter your registered email address and we'll send you a secure
            password reset link.
          </p>

          {/* Email */}

          <div className="mt-8">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full rounded-xl pl-11 h-12 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="btn w-full mt-7 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 border-none text-white text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70"
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

          {/* Security Note */}

          <div className="flex items-start gap-3 mt-6 bg-blue-50 dark:bg-slate-800 rounded-xl p-4">
            <FaShieldAlt className="text-blue-600 mt-1" />

            <p className="text-xs text-gray-600 dark:text-gray-400 leading-5">
              A secure password reset link will be sent to your email. The link
              expires in <strong>15 minutes</strong>.
            </p>
          </div>

          {/* Divider */}

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-gray-300 dark:bg-slate-700"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="h-px flex-1 bg-gray-300 dark:bg-slate-700"></div>
          </div>

          {/* Back */}

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 hover:gap-3"
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
