import React from "react";
import "./Hero.css";
import { MdMail } from "react-icons/md";
import { useAuth } from "../context/AuthProvider.jsx";

function Hero() {
  const [authUser, setAuthUser] = useAuth();

  return (
    <>
      <div className="herosection">
        <div className="herotext">
          <h2>
            {/* Hello, Welcome here to learn something <span>new everyday!!!</span> */}
          </h2>
          <p>
            Discover a world of stories, ideas, and learning at your fingertips.
            Explore our wide collection of free books across genres like
            fiction, education, and self-help. Save your favourites, learn
            anytime, and enhance your reading journey — all in one simple,
            user-friendly platform.
          </p>
          <p className=" flex items-center ">
            <MdMail className="absolute items-center ml-1 " />
            <input
              type="text"
              placeholder="Enter your email to sign in and start reading"
              className="email pl-6 py-1"
            />
          </p>
          {!authUser ? (
            <p>
              {" "}
              <button className="secondary">Get started</button>{" "}
            </p>
          ) : null}
        </div>
        <div className="booksimg ">
          {/* <img className="  dark:mix-blend-lighten" src={book} alt="img" /> */}
        </div>
      </div>
    </>
  );
}

export default Hero;
