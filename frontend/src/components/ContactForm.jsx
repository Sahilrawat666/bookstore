/**
 * The ContactForm component in JavaScript React renders a form for users to submit their contact
 * information.
 * @returns The `ContactForm` component is being returned. It is a form component that allows users to
 * enter their name, email, and message for contacting. The form includes validation for the name and
 * email fields. When the form is submitted, the data is logged to the console. The form also has a
 * submit button for users to submit their information.
 */
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function ContactForm() {
  //   const openSignupModal = () => {
  //     const modal = document.querySelector("#signup_modal");
  //     modal?.showModal();
  //   };
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div className="flex h-screen justify-center items-center  dark:bg-slate-900 dark:text-white">
        <div className=" border-[1px solid bg-gray-500] shadow-md p-5 rounded-md w-100">
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)} method="div">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost float-right right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold md: text-3xl text-center  dark:bg-slate-900 dark:text-white">
                Contact Us
              </h3>
              <div className="mt-4 ">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3 py-1 border rounded-md outline-none mt-1"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-sm text-red-500 ">
                    This field is required
                  </span>
                )}{" "}
              </div>
              <div className="mt-4 ">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-1 border rounded-md outline-none mt-1"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500 ">
                    This field is required
                  </span>
                )}
              </div>
              <div className="mt-4">
                <span>Message</span>
                <br />
                <textarea
                  type="text"
                  placeholder="Type your message"
                  className="   px-3 h-28 w-full border rounded-md outline-none mt-1"
                />
              </div>
              {/* button--------------- */}
              <div className="flex justify-around mt-4">
                <button className="bg-blue-500 cursor-pointer text-white rounded-md px-3 py-1 hover:bg-blue-700 duration-200">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
