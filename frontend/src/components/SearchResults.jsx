import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(
          `${window.location.origin}/book/search?query=${searchQuery}`
          // `${window.location.origin}/user/login`
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for: "{searchQuery}"
      </h2>

      {Array.isArray(results) && results.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((book) => (
            <div key={book._id} className="p-4 border rounded shadow">
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="font-bold text-lg">{book.name}</h3>
              <p>{book.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
