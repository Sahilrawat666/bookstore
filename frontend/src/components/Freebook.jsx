import React, { useEffect, useState } from "react";
import "./Freebook.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards.jsx";
import axios from "axios";

function Freebook() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book`);

        const data = res.data.filter((data) =>
          ["story", "GK"].includes(data.category)
        );
        console.log(data);
        setBook(data);
      } catch (error) {}
    };
    getBook();
  }, []);

  var settings = {
    dots: true,
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
      <div className="w-full bg-slate-100 dark:bg-[#161616]">
        <div className="freebooks  m-auto  ">
          <div className="freebook-heading">
            <h1 className="dark:text-white">free offered cources</h1>
            <p>
              Explore a curated selection of free courses designed to boost your
              knowledge and skills. From storytelling and general knowledge to
              sports facts and beyond — start learning today with engaging books
              and resources that inform, inspire, and empower your personal
              growth.
            </p>
          </div>
          <div>
            {" "}
            <Slider {...settings}>
              {book.map((item) => (
                <Cards item={item} key={item.id} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}

export default Freebook;
