import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { MdLightMode, MdDarkMode, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";
import { IoMenuSharp } from "react-icons/io5";
import toast from "react-hot-toast";

function Navbar() {
  // const [theme, setTheme] = useState(
  //   localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  // );
  // const element = document.documentElement;
  // useEffect(() => {
  //   if (theme === "dark") {
  //     element.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //     document.body.classList.add("dark");
  //   } else {
  //     element.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //     document.body.classList.remove("dark");
  //   }
  // }, [theme]);

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
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <>
      <nav className=" sticky top-0 left-0 bg-white/30 backdrop-blur-md shadow-md dark:bg-slate-900 dark:text-white dark:border-white ">
        <label className="logo text-black dark:text-white ">Book Store</label>
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/course">Cource</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          {/* toast.success("loggedin successfully");
{authUser?{handleSearch}: } */}
          {/* {authUser ? (handleSearch()) : toast.success("please login first")} */}

          <li className="flex items-center ">
            <form
              onSubmit={(e) => {
                e.preventDefault(); // prevent default form behavior
                if (authUser) {
                  handleSearch(e); // or just handleSearch() if not using event
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
                className="px-4  border rounded-l-md focus:outline-none lg:max-w-40 md:max-w-20"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </li>
          <li>
            <i>
              {darkMode ? (
                <MdLightMode
                  className="night cursor-pointer"
                  onClick={switchTheme}
                />
              ) : (
                <MdDarkMode
                  className="night cursor-pointer "
                  onClick={switchTheme}
                />
              )}
            </i>
          </li>
          <span className="my-1.5">
            {authUser ? (
              <Logout />
            ) : (
              <a
                className=" bg-black px-1 py-1 rounded-md text-white dark:bg-slate-950 dark:hover:bg-slate-800 "
                href="/login"
              >
                Login
              </a>
            )}
          </span>
        </ul>
        <div className=" flex items-center lg:hidden  float-right">
          <i className="search-icon   cursor-pointer  ">
            <form
              onSubmit={(e) => {
                e.preventDefault(); // prevent default form behavior
                if (authUser) {
                  handleSearch(e); // or just handleSearch() if not using event
                } else {
                  toast.error("Please login to search books");
                }
              }}
              className="flex"
            >
              <input
                type="text"
                placeholder="Search"
                // value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-2 text-sm border rounded-l-md border-black/20 
 focus:outline-none max-w-15"
              />
              <button
                type="submit"
                className="bg-slate-200 w-4 rounded-r-md hover:bd-slate-700"
              >
                <MdSearch className=" " />
              </button>
            </form>
          </i>

          <i className="menu text-xl " onClick={toggleMenu}>
            <IoMenuSharp />
          </i>
          <ul
            className={`absolute top-16 left-1/2 transform -translate-x-1/2 
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
                <a href="/login" className="text-lg font-medium">
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
