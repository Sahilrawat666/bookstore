import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode, MdSearch } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { LiaCartPlusSolid } from "react-icons/lia";
import { FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
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
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      setDarkMode(true);
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const switchTheme = () => {
    const nextTheme = darkMode ? "light" : "dark";

    setDarkMode(!darkMode);

    document.body.classList.toggle("dark", nextTheme === "dark");
    document.body.classList.toggle("light", nextTheme === "light");

    localStorage.setItem("theme", nextTheme);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      return;
    }

    if (!authUser) {
      toast.error("Please login first");
      navigate("/login");
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
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);

      toast.success("Logout successfully");
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
    `relative text-sm font-medium transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-current after:transition-all after:duration-200 ${isActive ? "text-[#315c4c] after:w-full dark:text-[#6f9f8b]" : "text-[#171717] after:w-0 hover:text-[#315c4c] hover:after:w-full dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b]"}`;

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#e5e5e5] bg-[#ebebeb] dark:border-[#303030] dark:bg-[#161616]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[68px] sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center text-xl text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b] lg:hidden"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex h-10 w-28 items-center overflow-hidden sm:w-32"
          >
            <img
              src={image}
              alt="Bookstore"
              className="h-full w-auto object-contain"
            />
          </Link>
        </div>

        <div className="hidden items-center gap-8 lg:flex">
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

        <div className="flex items-center gap-1 sm:gap-2">
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative flex h-9 w-52 items-center lg:w-64">
              <MdSearch className="pointer-events-none absolute left-3 text-lg text-[#666666] dark:text-[#a3a3a3]" />

              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search books..."
                aria-label="Search books"
                className="h-full w-full rounded-md border border-[#d8d8d8] bg-[#ffffff] pl-9 pr-16 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#888888] focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#f5f5f5] dark:placeholder:text-[#888888] dark:focus:border-[#6f9f8b]"
              />

              <button
                type="submit"
                className="absolute right-1 top-1 h-7 rounded bg-[#315c4c] px-2.5 text-xs font-medium text-white transition-colors hover:bg-[#264a3d] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
              >
                Search
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search books"
            className="flex h-9 w-9 items-center justify-center text-xl text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b] md:hidden"
          >
            <MdSearch />
          </button>

          <NavLink
            to="/favourite"
            aria-label="Favourite books"
            className="relative flex h-9 w-9 items-center justify-center text-xl text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b]"
          >
            <GoHeart />
            {favCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
                {favCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            aria-label="Shopping cart"
            className="relative flex h-9 w-9 items-center justify-center text-xl text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b]"
          >
            <LiaCartPlusSolid />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
                {cartCount}
              </span>
            )}
          </NavLink>

          <button
            type="button"
            onClick={switchTheme}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className="flex h-9 w-9 items-center justify-center text-xl text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b]"
          >
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              aria-label="Open account menu"
              aria-expanded={isUserMenuOpen}
              className="flex h-9 w-9 items-center justify-center text-xl text-[#171717] transition-colors hover:text-[#315c4c] dark:text-[#f5f5f5] dark:hover:text-[#6f9f8b]"
            >
              <FiUser />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 w-48 overflow-hidden rounded-md border border-[#e5e5e5] bg-[#ffffff] shadow-lg dark:border-[#303030] dark:bg-[#1d1d1d]">
                <div className="border-b border-[#e5e5e5] px-4 py-3 dark:border-[#303030]">
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#f5f5f5]">
                    Account
                  </p>
                  <p className="mt-0.5 text-xs text-[#666666] dark:text-[#a3a3a3]">
                    Manage your account
                  </p>
                </div>

                <div className="p-1.5">
                  <Link
                    to="/user"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 rounded px-3 py-2 text-sm text-[#171717] transition-colors hover:bg-[#f7f7f5] dark:text-[#f5f5f5] dark:hover:bg-[#181818]"
                  >
                    <FiUser />
                    My Profile
                  </Link>

                  <Link
                    to="/admin"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 rounded px-3 py-2 text-sm text-[#171717] transition-colors hover:bg-[#f7f7f5] dark:text-[#f5f5f5] dark:hover:bg-[#181818]"
                  >
                    <FiUser />
                    Admin
                  </Link>

                  {!authUser ? (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 rounded px-3 py-2 text-sm text-[#171717] transition-colors hover:bg-[#f7f7f5] dark:text-[#f5f5f5] dark:hover:bg-[#181818]"
                      >
                        Login
                      </Link>

                      <Link
                        to="/signup"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 rounded px-3 py-2 text-sm text-[#171717] transition-colors hover:bg-[#f7f7f5] dark:text-[#f5f5f5] dark:hover:bg-[#181818]"
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="border-t border-[#e5e5e5] bg-[#ebebeb] px-4 py-3 dark:border-[#303030] dark:bg-[#161616] md:hidden">
          <form onSubmit={handleSearch} className="mx-auto max-w-7xl">
            <div className="relative flex h-10 items-center">
              <MdSearch className="pointer-events-none absolute left-3 text-lg text-[#666666] dark:text-[#a3a3a3]" />

              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search books..."
                autoFocus
                aria-label="Search books"
                className="h-full w-full rounded-md border border-[#d8d8d8] bg-[#ffffff] pl-9 pr-20 text-sm text-[#171717] outline-none focus:border-[#315c4c] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#f5f5f5] dark:focus:border-[#6f9f8b]"
              />

              <button
                type="submit"
                className="absolute right-1 top-1 h-8 rounded bg-[#315c4c] px-3 text-xs font-medium text-white dark:bg-[#6f9f8b] dark:text-[#111111]"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}

      {isMenuOpen && (
        <div className="border-t border-[#e5e5e5] bg-[#ffffff] dark:border-[#303030] dark:bg-[#111111] lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-col">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className="border-b border-[#e5e5e5] py-3 text-sm font-medium text-[#171717] dark:border-[#303030] dark:text-[#f5f5f5]"
              >
                Home
              </NavLink>

              <NavLink
                to="/books"
                onClick={handleBookClick}
                className="border-b border-[#e5e5e5] py-3 text-sm font-medium text-[#171717] dark:border-[#303030] dark:text-[#f5f5f5]"
              >
                Books
              </NavLink>

              <NavLink
                to="/favourite"
                onClick={closeMobileMenu}
                className="flex items-center justify-between border-b border-[#e5e5e5] py-3 text-sm font-medium text-[#171717] dark:border-[#303030] dark:text-[#f5f5f5]"
              >
                <span>Favourite Books</span>
                {favCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {favCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                onClick={closeMobileMenu}
                className="flex items-center justify-between border-b border-[#e5e5e5] py-3 text-sm font-medium text-[#171717] dark:border-[#303030] dark:text-[#f5f5f5]"
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
                className="border-b border-[#e5e5e5] py-3 text-sm font-medium text-[#171717] dark:border-[#303030] dark:text-[#f5f5f5]"
              >
                Contact
              </NavLink>

              <div className="flex items-center gap-3 pt-4">
                {!authUser ? (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="flex-1 rounded-md border border-[#e5e5e5] px-4 py-2.5 text-center text-sm font-medium text-[#171717] transition-colors hover:bg-[#f7f7f5] dark:border-[#303030] dark:text-[#f5f5f5] dark:hover:bg-[#181818]"
                    >
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      onClick={closeMobileMenu}
                      className="flex-1 rounded-md bg-[#315c4c] px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-[#264a3d] dark:bg-[#6f9f8b] dark:text-[#111111] dark:hover:bg-[#82ad9b]"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/user"
                      onClick={closeMobileMenu}
                      className="flex-1 rounded-md border border-[#e5e5e5] px-4 py-2.5 text-center text-sm font-medium text-[#171717] transition-colors hover:bg-[#f7f7f5] dark:border-[#303030] dark:text-[#f5f5f5] dark:hover:bg-[#181818]"
                    >
                      My Profile
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex flex-1 items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
