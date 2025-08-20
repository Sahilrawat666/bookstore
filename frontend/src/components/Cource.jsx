import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from "axios";

function Cource() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${window.location.origin}/book`);
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto pt-38 md:px-20 px-4  ">
        <div className="   text-center">
          <h1 className="text-2xl  md:teat-4xl">
            We are delighted to have you{" "}
            <span className=" text-pink-500">here...!</span>
          </h1>
          <p className=" mt-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            iste illo sequi dicta praesentium, officiis, officia, debitis
            nostrum eligendi magnam voluptas iusto. Doloribus accusamus eaque
            nam vitae consequuntur odit quis.
          </p>
          <Link to="/">
            <button className=" bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 mt-6 cursor-pointer">
              {" "}
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 ">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Cource;
