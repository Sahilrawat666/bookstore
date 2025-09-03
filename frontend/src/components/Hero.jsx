import React from "react";
// import "./Hero.css";
import { MdMail } from "react-icons/md";
import { useAuth } from "../context/AuthProvider.jsx";

function Hero() {
  const [authUser, setAuthUser] = useAuth();

  return (
    <>
      <div className=" flex absolute inset-0 bg-black/50 h-screen  items-center justify-center h-4/5 ">
        <div className="w-full  text-center">
          <h2>
            {/* Hello, Welcome here to learn something <span>new everyday!!!</span> */}
          </h2>
          <p className=" text-white text-2xl text-bold my-2 sm:text-3xl md:text:4xl">
            ONLINE BOOKSTORE
          </p>
          <h1 className="text-4xl text-white my-2 font-bold sm:text-6xl">
            Living Word eBook
          </h1>
          {/* <p className=" flex items-center rounded-lg bg-white/50 py-1 px-3 sm:px-4 sm:py-3 ">
            <MdMail className="absolute items-center ml-1 " />
            <input
              type="text"
              placeholder="Enter your email to sign in and start reading"
              className=" text-sm pl-6  w-full "
            />
          </p> */}
          {authUser ? (
            <p>
              <button>
                <a
                  href="/course"
                  className="flex items-center justify-center h-12 my-4 leading-[3rem] text-white text-xl text-bold px-3  sm:text-2xl md:text:3xl border-2 rounded-4xl "
                >
                  Browse Books
                </a>
              </button>
            </p>
          ) : (
            <p>
              <button>
                <a
                  href="/login"
                  className="flex items-center justify-center h-12 my-4 leading-[3rem] text-white text-xl text-bold px-3  sm:text-2xl md:text:3xl border-2 rounded-4xl "
                >
                  Get started
                </a>
              </button>
            </p>
          )}
        </div>
        <div className="booksimg ">
          {/* <img className="  dark:mix-blend-lighten" src={book} alt="img" /> */}
        </div>
      </div>
    </>
  );
}

export default Hero;
