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
        const res = await axios.get(`${window.location.origin}/book`);

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
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
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
        },
      },
    ],
  };
  return (
    <>
      <div className="freebooks">
        <div className="freebook-heading">
          <h1 className=" dark:text-white">free offered cources</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere sed
            deserunt, tempore doloremque, debitis perferendis at dicta culpa
            omnis ipsam autem quidem maiores exercitationem libero dignissimos
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
    </>
  );
}

export default Freebook;
