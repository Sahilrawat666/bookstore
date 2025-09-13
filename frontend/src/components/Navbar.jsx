import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { MdLightMode, MdDarkMode, MdSearch } from "react-icons/md";
import { GoHeart } from "react-icons/go";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";
import { IoMenuSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { LiaCartPlusSolid } from "react-icons/lia";

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
      setIsSearchOpen(false); // 👈 auto-close after searcha
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 px-3 md:px-8  w-full  z-50 bg-[#ebebeb]  backdrop-blur-md shadow-md  dark:bg-[#161616] dark:text-white dark:border-white ">
        <div className="  max-w-[1440px] m-auto h-13 sm:h-15 lg:h-17 flex items-center justify-between">
          <label className="text-xl  sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blacck-600 dark:text-white tracking-wide">
            Book-Store
          </label>
          <div className="flex">
            <ul className="nav-links  ">
              <li className=" hidden sm:block">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-1 flex items-center lg:text-xl mx-2 lg:mx-4 rounded-md 
     ${
       isActive
         ? "underline underline-offset-4  "
         : "hover:underline underline-offset-4"
     }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="hidden sm:block ">
                <NavLink
                  to="/course"
                  className={({ isActive }) =>
                    `px-1 flex items-center lg:text-xl mx-2 lg:mx-4 rounded-md transition-all duration-200 
     ${
       isActive
         ? "underline underline-offset-4 "
         : "hover:underline underline-offset-4"
     }`
                  }
                >
                  Books
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/favourite"
                  className="px-1 flex items-center lg:text-xl  lg:mx-4 rounded-md transition-all duration-200 "
                >
                  <GoHeart className="text-2xl sm:text-2xl transform transition-transform duration-200 hover:scale-120 active:scale-95" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className="px-1 flex items-center lg:text-xl  lg:mx-2 rounded-md transition-all duration-200 "
                >
                  <LiaCartPlusSolid className="text-2xl sm:text-3xl transform transition-transform duration-200 hover:scale-120 active:scale-95" />
                </NavLink>
              </li>

              {/* ----------- Desktop Search ------------ */}
              <li className="flex items-center hidden sm:block">
                <form
                  className="max-w-md mx-auto"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (authUser) {
                      handleSearch(e);
                    } else {
                      toast.error("Please login first");
                    }
                  }}
                >
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>

                    <input
                      type="search"
                      // id="default-search"
                      className="block w-full px-4 py-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search books... "
                      onChange={(e) => setSearchTerm(e.target.value)}

                      // required
                    />
                    <button
                      type="submit"
                      className="text-white absolute end-0 top-0 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </li>

              {/* ----------- Theme Toggle ------------ */}
              <li className="px-1 flex items-center lg:text-xl  lg:mx-4 rounded-md transition-all duration-200 ">
                <i>
                  {darkMode ? (
                    <MdLightMode
                      className="text-2xl sm:text-3xl transform transition-transform duration-200 hover:scale-120 active:scale-95"
                      onClick={switchTheme}
                    />
                  ) : (
                    <MdDarkMode
                      className="text-2xl sm:text-3xl transform transition-transform duration-200 hover:scale-120 active:scale-95"
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
                      className="px-3 py-1   lg:text-lg   text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-slate-800 dark:hover:bg-slate-700 transition"
                    >
                      Login/Signup
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
                  className="p-2 rounded-full transform transition-transform duration-200 hover:scale-120 active:scale-95"
                >
                  <MdSearch size={20} className="" />
                </button>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (authUser) {
                      handleSearch(e);
                    } else {
                      toast.error("Please login first");
                    }
                  }}
                  className="absolute right-0 top-10  "
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`fixed left-0 top-15   right-0 h-[50px] w-auto bg-white shadow-md  transition-all  text-black   duration-200 border-2 border-white/20 rounded-md px-2 text-sm focus:outline-none
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
                <button className="px-3 py-1 flex items-center h-6  sm:hidden text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-slate-800 dark:hover:bg-slate-700 transition">
                  <a href="/login">login</a>
                </button>
              )}
              {/* ----------- Mobile Menu ------------ */}
              <i
                className="menu ml-2 text-lg sm:text-2xl lg:hidden cursor-pointer"
                onClick={toggleMenu}
              >
                <IoMenuSharp className="transform transition-transform duration-200 hover:scale-120 active:scale-95" />
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
                  <a
                    href="/"
                    className="text-lg font-medium hover:underline underline-offset-4 hover:decoration-2"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/course"
                    className="text-lg font-medium hover:underline underline-offset-4 hover:decoration-2"
                  >
                    Books
                  </a>
                </li>
                <li>
                  <a
                    href="/favourite"
                    className="text-lg font-medium hover:underline underline-offset-4 hover:decoration-2"
                  >
                    Favourites
                  </a>
                </li>{" "}
                <li>
                  <a
                    href="/cart"
                    className="flex items-center gap-2 text-lg font-medium hover:underline underline-offset-4 hover:decoration-2"
                  >
                    My Cart
                    <LiaCartPlusSolid className="text-xl" />
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-lg font-medium hover:underline underline-offset-4 hover:decoration-2"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-lg font-medium hover:underline underline-offset-4 hover:decoration-2"
                  >
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
        </div>
      </nav>
    </>
  );
}

export default Navbar;
