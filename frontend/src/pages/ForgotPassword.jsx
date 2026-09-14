import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiMail, FiShield } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import image from "../assets/image.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/forgot-password`,
        {
          email,
        },
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
    <main className="min-h-screen bg-white text-[#171717] dark:bg-[#111111] dark:text-[#f5f5f5]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md border border-[#e5e5e5] bg-white p-6 dark:border-[#303030] dark:bg-[#181818] sm:p-10">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/">
              <img
                src={image}
                alt="BookStore"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <Link
              to="/"
              aria-label="Back to home"
              className="flex h-9 w-9 items-center justify-center border border-[#e5e5e5] text-[#666666] transition hover:border-[#315c4c] hover:text-[#315c4c] dark:border-[#303030] dark:text-[#a3a3a3] dark:hover:border-[#6f9f8b] dark:hover:text-[#6f9f8b]"
            >
              <FiArrowLeft size={17} />
            </Link>
          </div>

          <div className="mb-8">
            <div className="mb-5 flex h-11 w-11 items-center justify-center bg-[#f7f7f5] text-[#315c4c] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]">
              <FiShield size={20} />
            </div>
            <p className="mb-2 text-sm font-medium text-[#315c4c] dark:text-[#6f9f8b]">
              Account recovery
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Forgot password?
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
              Enter your registered email and we'll send you a secure password
              reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="forgot-email"
                className="mb-2 block text-sm font-medium"
              >
                Email address
              </label>
              <div className="relative">
                <FiMail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666666] dark:text-[#a3a3a3]"
                  size={17}
                />
                <input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 w-full border border-[#e5e5e5] bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#111111] dark:placeholder:text-[#777777] dark:focus:border-[#6f9f8b]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 border border-[#171717] bg-[#171717] px-4 text-sm font-medium text-white transition hover:bg-[#315c4c] disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#f5f5f5] dark:bg-[#f5f5f5] dark:text-[#111111] dark:hover:bg-[#6f9f8b]"
            >
              {loading ? "Sending reset link..." : "Send reset link"}
            </button>
          </form>

          <div className="mt-6 flex gap-3 border border-[#e5e5e5] bg-[#f7f7f5] p-4 dark:border-[#303030] dark:bg-[#1d1d1d]">
            <FiCheckCircle
              className="mt-0.5 shrink-0 text-[#315c4c] dark:text-[#6f9f8b]"
              size={17}
            />
            <p className="text-xs leading-5 text-[#666666] dark:text-[#a3a3a3]">
              Your password reset link expires in{" "}
              <strong className="font-medium text-[#171717] dark:text-[#f5f5f5]">
                15 minutes
              </strong>
              .
            </p>
          </div>

          <div className="mt-7 border-t border-[#e5e5e5] pt-6 text-center dark:border-[#303030]">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#315c4c] hover:underline dark:text-[#6f9f8b]"
            >
              <FiArrowLeft size={15} />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
