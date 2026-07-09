import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import image from "../assets/image.png";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();
  const [loading, setLoading] = useState(false);
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/google-login`,
        {
          credential: credentialResponse.credential,
        },
      );

      toast.success("Logged in successfully", {
        id: "google-login-success",
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("User", JSON.stringify(res.data.user));

      setAuthUser(res.data.user);

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google Login Failed");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (loading) return;
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        userInfo,
      );

      if (res.data) {
        toast.success("Logged in successfully ", { id: "login-success" });

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
    <div className=" py-3 sm:max-w-xl sm:mx-auto h-screen flex items-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-xs sm:w-md mx-auto  px-4 py-10 bg-white dark:bg-black dark:text-white  shadow rounded-3xl sm:p-10"
      >
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className=" w-30 sm:w-40   flex items-center justify-between overflow-hidden">
            <Link to="/" className="flex items-center">
              <img
                src={image}
                alt="ZenTask Logo"
                className="h-full w-auto object-contain scale-110  "
              />
            </Link>
          </div>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost relative float-right  "
          >
            ✕
          </Link>
        </div>

        <div className="flex flex-col gap-0.5 sm:gap-2 mt-4 ">
          {/* Email */}
          <div>
            <label className="font-semibold text-sm text-gray-600 dark:text-gray-300 pb-1 block">
              E-mail
            </label>
            <input
              className="border rounded-lg py-1 px-2 sm:py-2 sm:px-4 mt-1 mb-2 text-sm w-full"
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-xs text-red-500">Email is required</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold text-sm cursor-pointer text-gray-600 dark:text-gray-300 pb-1 block">
              Password
            </label>
            <input
              className="border rounded-lg py-1 px-2 sm:py-2 sm:px-4 mt-1 mb-2 text-sm w-full"
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-xs text-red-500">Password is required</span>
            )}
          </div>
        </div>

        {/* Forgot password */}
        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            className="text-xs font-display font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit button */}
        <div className="mt-5">
          <button
            type="submit"
            disabled={loading}
            className={`py-1 px-2 sm:py-2 sm:px-4 w-full font-semibold rounded-lg text-white cursor-pointer
    ${
      loading
        ? "bg-blue-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>

        {/* google login button*/}
        <div className="group mt-4 relative rounded-lg">
          <div className="absolute inset-0 opacity-0 z-10">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google Login Failed")}
            />
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-1 px-2 sm:py-2 sm:px-4 border border-gray-300 rounded-lg bg-white transition group-hover:bg-gray-100"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>
        </div>

        {/* Signup link */}
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          <a
            className="text-xs cursor-pointer text-gray-500 uppercase hover:underline"
            href="/signup"
          >
            or sign up
          </a>
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </form>
    </div>
  );
}

export default Login;
