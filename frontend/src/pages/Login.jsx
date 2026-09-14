import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { FiArrowLeft, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import image from "../assets/image.png";

function Login() {
  const navigate = useNavigate();
  const [, setAuthUser] = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/google-login`,
        {
          credential: credentialResponse.credential,
        },
      );

      toast.success("Logged in successfully", { id: "google-login-success" });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("User", JSON.stringify(res.data.user));
      setAuthUser(res.data.user);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google Login Failed");
    }
  };

  const onSubmit = async (data) => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        {
          email: data.email,
          password: data.password,
        },
      );

      if (res.data) {
        toast.success("Logged in successfully", { id: "login-success" });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("User", JSON.stringify(res.data.user));
        setAuthUser(res.data.user);
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        toast.error("Invalid username or password!", { id: "login-error" });
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#171717] dark:bg-[#111111] dark:text-[#f5f5f5]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden border border-[#e5e5e5] bg-white dark:border-[#303030] dark:bg-[#181818] lg:grid-cols-2">
          <div className="hidden flex-col justify-between bg-[#f7f7f5] p-10 dark:bg-[#1d1d1d] lg:flex">
            <div>
              <Link to="/" className="inline-flex items-center">
                <img
                  src={image}
                  alt="BookStore"
                  className="h-14 w-auto object-contain"
                />
              </Link>
            </div>

            <div className="max-w-md">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#315c4c] dark:text-[#6f9f8b]">
                Welcome back
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-[#171717] dark:text-[#f5f5f5]">
                Continue your reading journey.
              </h1>
              <p className="mt-5 text-sm leading-7 text-[#666666] dark:text-[#a3a3a3]">
                Sign in to access your books, wishlist, cart, orders, and
                personalised account.
              </p>
            </div>

            <p className="text-xs text-[#666666] dark:text-[#a3a3a3]">
              Discover books. Build your library.
            </p>
          </div>

          <div className="w-full p-6 sm:p-10 lg:p-12">
            <div className="mb-8 flex items-center justify-between lg:justify-end">
              <Link to="/" className="lg:hidden">
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
              <p className="mb-2 text-sm font-medium text-[#315c4c] dark:text-[#6f9f8b]">
                Account
              </p>
              <h2 className="text-3xl font-semibold tracking-tight">Sign in</h2>
              <p className="mt-2 text-sm text-[#666666] dark:text-[#a3a3a3]">
                Enter your details to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label
                  htmlFor="login-email"
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
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...register("email", { required: true })}
                    className="h-12 w-full border border-[#e5e5e5] bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#111111] dark:placeholder:text-[#777777] dark:focus:border-[#6f9f8b]"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    Email is required.
                  </p>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-[#315c4c] hover:underline dark:text-[#6f9f8b]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <FiLock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666666] dark:text-[#a3a3a3]"
                    size={17}
                  />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    {...register("password", { required: true })}
                    className="h-12 w-full border border-[#e5e5e5] bg-white pl-10 pr-11 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#111111] dark:placeholder:text-[#777777] dark:focus:border-[#6f9f8b]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#171717] dark:text-[#a3a3a3] dark:hover:text-[#f5f5f5]"
                  >
                    {showPassword ? (
                      <FiEyeOff size={17} />
                    ) : (
                      <FiEye size={17} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    Password is required.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center border border-[#171717] bg-[#171717] px-4 text-sm font-medium text-white transition hover:bg-[#315c4c] disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#f5f5f5] dark:bg-[#f5f5f5] dark:text-[#111111] dark:hover:bg-[#6f9f8b]"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#e5e5e5] dark:bg-[#303030]" />
              <span className="text-xs uppercase tracking-wider text-[#999999]">
                or
              </span>
              <span className="h-px flex-1 bg-[#e5e5e5] dark:bg-[#303030]" />
            </div>

            <div className="relative h-12">
              <div className="absolute inset-0 z-10 opacity-0">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google Login Failed")}
                />
              </div>
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 border border-[#e5e5e5] bg-white text-sm font-medium text-[#171717] transition hover:bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#111111] dark:text-[#f5f5f5] dark:hover:bg-[#1d1d1d]"
              >
                <FcGoogle size={20} />
                Continue with Google
              </button>
            </div>

            <p className="mt-7 text-center text-sm text-[#666666] dark:text-[#a3a3a3]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#315c4c] hover:underline dark:text-[#6f9f8b]"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
