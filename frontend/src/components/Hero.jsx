import React from "react";
import "./Hero.css";
// import book from "../images/book.png";
import { MdMail } from "react-icons/md";
// import bookimgg from "../images/bookimgg.jpg"

function Hero() {
  return (
    <>
      <div className="herosection">
        <div className="herotext">
          <h2>
            Hello, Welcome here to learn something <span>new everyday!!!</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            laboriosam tenetur dolores quas architecto explicabo fugit,
            accusantium vitae hic quidem natus ad. Labore deleniti fugiat
            eveniet vel ipsam. Sed, culpa.
          </p>
          <p className=" flex items-center ">
            <MdMail className="absolute items-center ml-1 " />
            <input
              type="text"
              placeholder="Enter your email to login"
              className="email pl-6 py-1"
            />
          </p>
          <button className="secondary"> Get started</button>
        </div>
        <div className="booksimg ">
          {/* <img className="  dark:mix-blend-lighten" src={book} alt="img" /> */}
        </div>
      </div>
    </>
  );
}

export default Hero;
