import React from "react";
import { useAuth } from "../context/AuthProvider.jsx";

function Hero() {
  const [authUser, setAuthUser] = useAuth();

  return (
    <>
      <div className="w-full   h-dvh  bg-[url('https://books.livingword.ph/wp-content/uploads/2021/08/livingword-online-bookstore-header-1920-2-min.jpg')] bg-cover bg-center">
        <div className=" flex flex-col justify-center w-full h-screen mx-auto inset-1 bg-black/40 dark:bg-black/60 text-center">
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
                  href="/books"
                  className="flex items-center justify-center h-12 my-4 leading-[3rem] text-white text-xl text-bold px-3   sm:text-lg border-2 rounded-3xl active:scale-95 transition transform duration-100 "
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
                  className="flex items-center justify-center h-12 my-4 leading-[3rem] text-white text-xl text-bold px-3  sm:text-2xl md:text:3xl border-2 rounded-3xl "
                >
                  Get started
                </a>
              </button>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Hero;
