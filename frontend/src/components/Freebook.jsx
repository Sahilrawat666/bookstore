import React, { useEffect, useState } from "react";
// import "./Freebook.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards.jsx";
import axios from "axios";

function Freebook() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true); // 🔹 added loading state

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book`);
        const data = res.data.filter((data) =>
          ["story", "GK"].includes(data.category)
        );
        console.log(data);
        setBook(data);
      } catch (error) {
      } finally {
        setLoading(false); // 🔹 stop loading after fetch
      }
    };
    getBook();
  }, []);

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="w-full h-auto bg-slate-100 dark:bg-[#161616] px-3 py-12   md:px-8 ">
        <div className="freebooks max-w-[1440px] mx-auto  ">
          <div className="freebook-heading    ">
            <h1 className="dark:text-white text-4xl font-bold mx-auto w-fit   ">
              free offered books
            </h1>
            <p className="my-5 ">
              Explore a curated selection of free courses designed to boost your
              knowledge and skills. From storytelling and general knowledge to
              sports facts and beyond — start learning today with engaging books
              and resources that inform, inspire, and empower your personal
              growth.
            </p>
          </div>
          {/* 🔹 Show loading until books are fetched */}
          {loading ? (
            <div className="text-center text-xl py-20 dark:text-white">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 animate-pulse">
                Loading books...
              </p>
            </div>
          ) : (
            <Slider {...settings}>
              {book.map((item) => (
                <Cards item={item} key={item._id} />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </>
  );
}

export default Freebook;
