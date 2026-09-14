import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Cards from "./Cards.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { MdSearch } from "react-icons/md";

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/book/search?query=${encodeURIComponent(searchQuery)}`,
        );

        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-20 dark:bg-[#111111]">
        <section className="border-b border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#181818]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#d9d9d9] bg-white text-[#315c4c] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]">
                <MdSearch size={24} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#315c4c] dark:text-[#6f9f8b]">
                  Search
                </p>

                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl dark:text-[#f5f5f5]">
                  Results for "{searchQuery}"
                </h1>

                {!loading && (
                  <p className="mt-2 text-sm text-[#666666] dark:text-[#a3a3a3]">
                    {results.length} {results.length === 1 ? "book" : "books"}{" "}
                    found
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-[380px] animate-pulse border border-[#e5e5e5] bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#1d1d1d]"
                />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center border border-dashed border-[#d9d9d9] px-6 text-center dark:border-[#303030]">
              <MdSearch
                size={42}
                className="text-[#aaaaaa] dark:text-[#666666]"
              />

              <h2 className="mt-4 text-lg font-semibold text-[#171717] dark:text-[#f5f5f5]">
                No books found
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
                Try searching with another title, author, or keyword.
              </p>

              <Link
                to="/books"
                className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-[#315c4c] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#274c3f] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
              >
                Browse all books
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {results.map((item) => (
                <Cards key={item._id} item={item} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default SearchResults;
