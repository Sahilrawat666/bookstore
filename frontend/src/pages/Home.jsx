import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero.jsx";
import FeaturedBooks from "../components/FeaturedBooks.jsx";
import NewArrivals from "../components/NewArrivals.jsx";
import PopularBooks from "../components/PopularBooks.jsx";
import ReadingPromo from "../components/ReadingPromo.jsx";
import NewsletterSection from "../components/NewsletterSection.jsx";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const checkImage = (url) => {
      return new Promise((resolve) => {
        if (!url || typeof url !== "string") {
          resolve(false);
          return;
        }

        const image = new Image();

        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);

        image.src = url;
      });
    };

    const getBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/book`,
        );
        const allBooks = Array.isArray(response.data) ? response.data : [];

        const results = await Promise.all(
          allBooks.map(async (book) => ({
            book,
            valid: await checkImage(book.image),
          })),
        );

        const validBooks = results
          .filter((item) => item.valid)
          .map((item) => item.book);

        if (isMounted) {
          setBooks(validBooks);
        }
      } catch (requestError) {
        console.error("Error loading homepage books:", requestError);

        if (isMounted) {
          setError("Unable to load books right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Hero />
      <FeaturedBooks books={books} loading={loading} error={error} />
      <NewArrivals books={books} loading={loading} error={error} />
      <PopularBooks books={books} loading={loading} error={error} />
      <ReadingPromo />
      <NewsletterSection />
    </>
  );
}

export default Home;
