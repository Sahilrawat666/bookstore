import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { MdLightMode, MdDarkMode, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";
import { IoMenuSharp } from "react-icons/io5";
import toast from "react-hot-toast";

function Navbar() {
  const [darkMode, SetDarkmode] = useState(false);
  const switchTheme = async () => {
    SetDarkmode(!darkMode);

    if (darkMode === true) {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    if (darkMode === false) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light");
    } else if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      SetDarkmode(!darkMode);
    }
  }, []);

  const [authUser, setAuthUser] = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [top, setTop] = useState(true);
  useEffect(() => {
    const scrollHandler = () => {
      setTop(window.scrollY <= 10);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  // search book
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 👈 new state
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm("");
      setIsSearchOpen(false); // 👈 auto-close after search
    }
  };

  return (
    <>
      <nav className="sticky top-0 left-0 bg-white/30 backdrop-blur-md shadow-md dark:bg-slate-700 dark:text-white dark:border-white">
        <label className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blacck-600 dark:text-white tracking-wide">
          Book Store
        </label>
        <div className="flex">
          <ul className="nav-links">
            <li className="sm:hidden md:flex">
              <a
                href="/"
                className="px-3 py-1 rounded-md hover:bg-slate-100 transition-all duration-200"
              >
                Home
              </a>
            </li>
            <li className="sm:hidden md:flex">
              <a
                href="/course"
                className="px-3 py-1 rounded-md hover:bg-slate-100 transition-all duration-200"
              >
                Cource
              </a>
            </li>
            <li className="sm:hidden md:flex">
              <a
                href="/contact"
                className="px-3 py-1 rounded-md hover:bg-slate-100 transition-all duration-200"
              >
                Contact
              </a>
            </li>
            <li className="sm:hidden md:flex">
              <a
                href=""
                className="px-3 py-1 rounded-md hover:bg-slate-100 transition-all duration-200"
              >
                About
              </a>
            </li>

            {/* ----------- Desktop Search ------------ */}
            <li className="flex items-center">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (authUser) {
                    handleSearch(e);
                  } else {
                    toast.error("Please login to search books");
                  }
                }}
                className="flex"
              >
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 border rounded-l-md focus:outline-none sm:ml-2 sm:w-25 sm:px-1 sm:text-xs"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white sm:w-15 sm:text-sm rounded-r-md hover:bg-blue-700"
                >
                  Search
                </button>
              </form>
            </li>

            {/* ----------- Theme Toggle ------------ */}
            <li>
              <i>
                {darkMode ? (
                  <MdLightMode
                    className="night cursor-pointer"
                    onClick={switchTheme}
                  />
                ) : (
                  <MdDarkMode
                    className="night cursor-pointer"
                    onClick={switchTheme}
                  />
                )}
              </i>
            </li>

            {/* ----------- Login/Signup ------------ */}
            <span className="my-1.5 gap-2 hidden md:flex">
              {authUser ? (
                <i>
                  <Logout />
                </i>
              ) : (
                <>
                  <a
                    href="/login"
                    className="px-3 py-1 sm:text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-slate-800 dark:hover:bg-slate-700 transition"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="px-3 py-1 sm:text-sm text-white bg-green-600 rounded-md hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-700 transition"
                  >
                    Signup
                  </a>
                </>
              )}
            </span>
          </ul>

          <div className="flex items-center float-right">
            {/* ----------- Mobile Search with Icon ------------ */}
            <div className="relative sm:hidden">
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-slate-200"
              >
                <MdSearch size={20} />
              </button>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (authUser) {
                    handleSearch(e);
                  } else {
                    toast.error("Please login to search books");
                  }
                }}
                className="absolute  right-0 top-10"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`transition-all w-60 text-white  duration-200 border-2 border-white/20 rounded-md px-2 text-sm focus:outline-none
                    ${
                      isSearchOpen
                        ? "w-40 opacity-100"
                        : "w-0 opacity-0 pointer-events-none"
                    }`}
                />
                <button type="submit" className="hidden" />
              </form>
            </div>

            {authUser ? null : (
              <button className="px-3 py-1  md:hidden text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-slate-800 dark:hover:bg-slate-700 transition">
                <a href="/login">login</a>
              </button>
            )}
            {/* ----------- Mobile Menu ------------ */}
            <i
              className="menu ml-2 text-md sm:text-xl md:hidden cursor-pointer"
              onClick={toggleMenu}
            >
              <IoMenuSharp />
            </i>
            {/* ----------- Dropdown Menu ------------ */}
            <ul
              className={`absolute top-16 dark:bg-slate-800 left-1/2 transform -translate-x-1/2 
                bg-white shadow-md z-50 w-[90vw] 
                flex flex-col items-center justify-center gap-6 py-8
                transition-all duration-500 ease-in-out rounded-xl
                ${
                  isMenuOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-10 invisible"
                }`}
            >
              <li>
                <a href="/" className="text-lg font-medium">
                  Home
                </a>
              </li>
              <li>
                <a href="/course" className="text-lg font-medium">
                  Course
                </a>
              </li>
              <li>
                <a href="/contact" className="text-lg font-medium">
                  Contact
                </a>
              </li>
              <li>
                <a href="/about" className="text-lg font-medium">
                  About
                </a>
              </li>
              {authUser ? (
                <Logout />
              ) : (
                <li>
                  <a href="/login" className="text-lg font-medium ">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
