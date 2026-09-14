import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards.jsx";
import axios from "axios";
import { motion } from "framer-motion";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";

function Freebook() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkImage = (imageUrl) => {
      return new Promise((resolve) => {
        if (!imageUrl || typeof imageUrl !== "string") {
          resolve(false);
          return;
        }

        const image = new Image();

        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);

        image.src = imageUrl;
      });
    };

    const getBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book`);

        const featuredBooks = (Array.isArray(res.data) ? res.data : []).filter(
          (item) => ["story", "GK"].includes(item.category) && item.image,
        );

        const imageResults = await Promise.all(
          featuredBooks.map(async (item) => ({
            item,
            isValid: await checkImage(item.image),
          })),
        );

        const validBooks = imageResults
          .filter(({ isValid }) => isValid)
          .map(({ item }) => item);

        if (isMounted) {
          setBook(validBooks);
        }
      } catch (error) {
        console.error("Error fetching featured books:", error);

        if (isMounted) {
          setBook([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getBook();

    return () => {
      isMounted = false;
    };
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: book.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: book.length > 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: book.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: book.length > 2,
        },
      },
    ],
  };

  return (
    <section className="border-b border-[#e5e5e5] bg-white py-16 dark:border-[#303030] dark:bg-[#111111]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#315c4c] dark:text-[#6f9f8b]">
              Curated selection
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl dark:text-[#f5f5f5]">
              Featured Books
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
              Explore selected stories and general knowledge books from our
              collection.
            </p>
          </motion.div>

          <Link
            to="/books"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#315c4c] transition-colors hover:text-[#274c3f] dark:text-[#6f9f8b] dark:hover:text-[#82ad9b]"
          >
            View all books
            <MdArrowForward size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse border border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]"
              />
            ))}
          </div>
        ) : book.length === 0 ? (
          <div className="border border-dashed border-[#d9d9d9] px-6 py-16 text-center dark:border-[#303030]">
            <p className="text-sm font-medium text-[#171717] dark:text-[#f5f5f5]">
              No featured books available right now.
            </p>

            <p className="mt-2 text-sm text-[#666666] dark:text-[#a3a3a3]">
              Check the full collection for more books.
            </p>
          </div>
        ) : (
          <div className="featured-books-slider">
            <Slider {...settings}>
              {book.map((item) => (
                <div key={item._id} className="px-2 pb-2">
                  <Cards item={item} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
}

export default Freebook;
