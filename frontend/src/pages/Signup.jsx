import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        userInfo
      );

      if (res.data) {
        toast.success("Signup successful ");
        localStorage.setItem("User", JSON.stringify(res.data.user));
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className=" py-3 sm:max-w-xl sm:mx-auto h-screen w-full flex items-center justify-center dark:bg-slate-900 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-md mx-auto  px-6 py-10 bg-white dark:bg-slate-900 dark:text-white  md:mx-0 shadow rounded-3xl sm:p-10"
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
            Create Account
          </h1>
        </div>

        {/* Name */}
        <div className="mt-5">
          <label className="font-semibold text-sm text-gray-600 dark:text-gray-300 pb-1 block">
            Full Name
          </label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
            type="text"
            {...register("fullname", { required: true })}
            placeholder="Enter your name"
          />
          {errors.fullname && (
            <span className="text-xs text-red-500">Name is required</span>
          )}
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="font-semibold text-sm text-gray-600 dark:text-gray-300 pb-1 block">
            Email
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

        {/* Submit button */}
        <div className="mt-5">
          <button
            className="py-2 px-4 bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 text-white w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none rounded-lg"
            type="submit"
          >
            Sign up
          </button>
        </div>

        {/* Login link */}
        <div className="flex items-center justify-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline text-blue-500 hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
