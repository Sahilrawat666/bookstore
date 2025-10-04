import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        userInfo
      );

      if (res.data) {
        toast.success("Logged in successfully ");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("User", JSON.stringify(res.data));

        navigate("/");
        window.location.reload(); // refresh app state
      }
    } catch (err) {
      if (err.response) {
        toast.error("Invalid username or password ❌");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className=" py-3 sm:max-w-xl sm:mx-auto h-screen flex items-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-md mx-auto  px-4 py-10 bg-white dark:bg-black dark:text-white  shadow rounded-3xl sm:p-10"
      >
        <Link
          to="/"
          className="btn btn-sm btn-circle btn-ghost relative float-right  "
        >
          ✕
        </Link>
        {/* Title */}
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Book-Store
          </h1>
        </div>

        {/* Email */}
        <div className="mt-5">
          <label className="font-semibold text-sm text-gray-600 dark:text-gray-300 pb-1 block">
            E-mail
          </label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="text-xs text-red-500">Email is required</span>
          )}
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="font-semibold text-sm text-gray-600 dark:text-gray-300 pb-1 block">
            Password
          </label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
            type="password"
            {...register("password", { required: true })}
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="text-xs text-red-500">Password is required</span>
          )}
        </div>

        {/* Forgot password */}
        <div className="text-right mb-4">
          <a
            className="text-xs font-display font-semibold text-gray-500 hover:text-gray-600 cursor-pointer"
            href="#"
          >
            Forgot Password?
          </a>
        </div>

        {/* Submit button */}
        <div className="mt-5">
          <button
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none rounded-lg"
            type="submit"
          >
            Log in
          </button>
        </div>

        {/* Signup link */}
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          <a
            className="text-xs text-gray-500 uppercase hover:underline"
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
