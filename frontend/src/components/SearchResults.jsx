import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Cards from "./Cards.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/book/search?query=${searchQuery}`
          // `${import.meta.env.VITE_BACKEND_URL}/user/login`
        );

        if (Array.isArray(res.data)) {
          setResults(res.data);
        } else {
          setResults([]); // fallback if response is not an array
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <>
      <Navbar />
      <div className="p-6 mt-13 md:mt-15 lg:mt-17 min-h-screen">
        <h2 className="text-2xl font-bold mb-4  place-self-center">
          Search Results for: "{searchQuery}"
        </h2>

        {Array.isArray(results) && results.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <div className="flex flex-wrap gap-3 justify-center">
            {results.map((item) => (
              <Cards key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default SearchResults;
