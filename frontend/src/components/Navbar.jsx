import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { MdLightMode, MdDarkMode, MdSearch } from "react-icons/md";
// import Login from "./Login";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";
import { IoMenuSharp } from "react-icons/io5";

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

  return (
    <>
      <nav className=" sticky top-0 left-0 bg-gray-300 dark:bg-slate-900 dark:text-white dark:border-white ">
        <label htmlFor="" className="logo text-black dark:text-white">
          Book Store
        </label>
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

          <li className="flex items-center ">
            <MdSearch className="absolute ml-1 text-1" />
            <input type="text" placeholder="search" className="search pl-6" />
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
        <i className="menu" onClick={toggleMenu}>
          <IoMenuSharp />
        </i>
        <ul className={isMenuOpen ? "menu-links active" : "menu-links "}>
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
          {authUser ? (
            <Logout />
          ) : (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
