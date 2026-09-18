import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode, MdSearch } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { LiaCartPlusSolid } from "react-icons/lia";
import {
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiShield,
  FiLogIn,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import image from "../assets/image.png";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [authUser, setAuthUser, cartCount, , favCount] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      setDarkMode(true);
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-user-menu]")) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const switchTheme = () => {
    const nextTheme = darkMode ? "light" : "dark";

    setDarkMode(!darkMode);

    if (nextTheme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }

    localStorage.setItem("theme", nextTheme);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (!authUser) {
      toast.error("Please login first");
      navigate("/login");
      setIsSearchOpen(false);
      setIsMenuOpen(false);
      return;
    }

    if (!searchTerm.trim()) {
      return;
    }

    navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  const handleBookClick = () => {
    if (!authUser) {
      toast.error("Please login first!");
      navigate("/login");
      setIsMenuOpen(false);
      return;
    }

    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });

      localStorage.removeItem("User");

      toast.success("Logout successfully");

      setIsUserMenuOpen(false);
      setIsMenuOpen(false);

      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-200 ${isActive ? "text-[#315c4c] dark:text-[#6f9f8b]" : "text-[#171717] hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b]"}`;

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-transparent bg-[#ebebeb] dark:bg-[#161616] dark:border-[#303030]">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-[68px] sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b] lg:hidden"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex h-10 w-28 items-center sm:w-32"
          >
            <img
              src={image}
              alt="Bookstore logo"
              className="h-full w-full object-contain object-left"
            />
          </Link>
        </div>

        <div className="hidden items-center gap-7 lg:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink
            to="/books"
            onClick={handleBookClick}
            className={navLinkClass}
          >
            Books
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </div>

        <div className="flex items-center gap-2  sm:gap-3">
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative flex h-9 w-52 items-center overflow-hidden rounded-md border border-[#d6d6d6] bg-white dark:border-[#303030] dark:bg-[#1d1d1d] lg:w-60">
              <MdSearch
                className="absolute left-3 text-[#666666] dark:text-[#a3a3a3]"
                size={19}
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search books..."
                aria-label="Search books"
                className="h-full w-full bg-transparent py-2 pl-9 pr-16 text-xs text-[#171717] outline-none placeholder:text-[#888888] dark:text-[#f5f5f5] dark:placeholder:text-[#777777]"
              />

              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 rounded bg-[#315c4c] px-2.5 text-[11px] font-medium text-white transition-colors hover:bg-[#274c3f] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
              >
                Search
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b] md:hidden"
            aria-label="Open search"
          >
            <MdSearch size={22} />
          </button>

          <NavLink
            to="/favourite"
            className="relative flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b]"
            aria-label="Favourite books"
          >
            <GoHeart size={21} />

            {favCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4  items-center justify-center rounded-full bg-red-500 px-1 text-[8px] md:text-[10px font-semibold leading-none text-white">
                {favCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className="relative flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b]"
            aria-label="Shopping cart"
          >
            <LiaCartPlusSolid size={23} />

            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[8px] md:text-[10px] font-semibold leading-none text-white">
                {cartCount}
              </span>
            )}
          </NavLink>

          <button
            type="button"
            onClick={switchTheme}
            className="flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b]"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <MdLightMode size={21} /> : <MdDarkMode size={21} />}
          </button>

          <div className="relative" data-user-menu>
            <button
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex h-9 items-center gap-1.5 text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b]"
              aria-label="Open user menu"
              aria-expanded={isUserMenuOpen}
            >
              <FiUser size={21} />
              <FiChevronDown
                size={14}
                className={`hidden transition-transform duration-200 sm:block ${isUserMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 w-52 overflow-hidden rounded-md border border-[#e5e5e5] bg-white shadow-lg dark:border-[#303030] dark:bg-[#1d1d1d]">
                <div className="border-b border-[#e5e5e5] px-4 py-3 dark:border-[#303030]">
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#f5f5f5]">
                    Account
                  </p>
                  <p className="mt-0.5 text-xs text-[#666666] dark:text-[#a3a3a3]">
                    {authUser
                      ? "Manage your account"
                      : "Welcome to our bookstore"}
                  </p>
                </div>

                <div className="p-1.5">
                  <Link
                    to="/user"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 rounded px-3 py-2.5 text-sm text-[#171717] transition-colors hover:bg-[#f7f7f5] dark:text-[#f5f5f5] dark:hover:bg-[#181818]"
                  >
                    <FiUser size={17} />
                    My Profile
                  </Link>

                  <Link
                    to="/admin"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 rounded px-3 py-2.5 text-sm text-[#171717] transition-colors hover:bg-[#f7f7f5] dark:text-[#f5f5f5] dark:hover:bg-[#181818]"
                  >
                    <FiShield size={17} />
                    Admin
                  </Link>

                  {authUser ? (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20"
                    >
                      <FiLogOut size={17} />
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 rounded px-3 py-2.5 text-sm text-[#171717] transition-colors hover:bg-[#f7f7f5] dark:text-[#f5f5f5] dark:hover:bg-[#181818]"
                      >
                        <FiLogIn size={17} />
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="border-t border-[#d9d9d9] bg-[#ebebeb] px-4 py-3 dark:border-[#303030] dark:bg-[#161616] md:hidden">
          <form onSubmit={handleSearch} className="mx-auto max-w-7xl">
            <div className="relative flex h-10 items-center overflow-hidden rounded-md border border-[#d6d6d6] bg-white dark:border-[#303030] dark:bg-[#1d1d1d]">
              <MdSearch
                className="absolute left-3 text-[#666666] dark:text-[#a3a3a3]"
                size={19}
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search books..."
                autoFocus
                aria-label="Search books"
                className="h-full w-full bg-transparent py-2 pl-9 pr-20 text-sm text-[#171717] outline-none placeholder:text-[#888888] dark:text-[#f5f5f5] dark:placeholder:text-[#777777]"
              />

              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 rounded bg-[#315c4c] px-3 text-xs font-medium text-white transition-colors hover:bg-[#274c3f] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}

      {isMenuOpen && (
        <div className="border-t border-[#d9d9d9] bg-white dark:border-[#303030] dark:bg-[#111111] lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
            <div className="flex flex-col">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className="border-b border-[#e5e5e5] py-3.5 text-sm font-medium text-[#171717] dark:border-[#303030] dark:text-[#f5f5f5]"
              >
                Home
              </NavLink>

              <NavLink
                to="/books"
                onClick={handleBookClick}
                className="border-b border-[#e5e5e5] py-3.5 text-sm font-medium text-[#171717] dark:border-[#303030] dark:text-[#f5f5f5]"
              >
                Books
              </NavLink>

              <NavLink
                to="/favourite"
                onClick={closeMobileMenu}
                className="flex items-center justify-between border-b border-[#e5e5e5] py-3.5 text-sm font-medium text-[#171717] dark:border-[#303030] dark:text-[#f5f5f5]"
              >
                <span>Favourites</span>
                {favCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {favCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                onClick={closeMobileMenu}
                className="flex items-center justify-between border-b border-[#e5e5e5] py-3.5 text-sm font-medium text-[#171717] dark:border-[#303030] dark:text-[#f5f5f5]"
              >
                <span>My Cart</span>
                {cartCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/contact"
                onClick={closeMobileMenu}
                className="border-b border-[#e5e5e5] py-3.5 text-sm font-medium text-[#171717] dark:border-[#303030] dark:text-[#f5f5f5]"
              >
                Contact
              </NavLink>

              <Link
                to="/user"
                onClick={closeMobileMenu}
                className="border-b border-[#e5e5e5] py-3.5 text-sm font-medium text-[#171717] dark:border-[#303030] dark:text-[#f5f5f5]"
              >
                My Profile
              </Link>

              <Link
                to="/admin"
                onClick={closeMobileMenu}
                className="border-b border-[#e5e5e5] py-3.5 text-sm font-medium text-[#171717] dark:border-[#303030] dark:text-[#f5f5f5]"
              >
                Admin
              </Link>

              {authUser ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-3.5 text-left text-sm font-medium text-red-600 dark:text-red-400"
                >
                  <FiLogOut size={17} />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="py-3.5 text-sm font-medium text-[#171717] dark:text-[#f5f5f5]"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
