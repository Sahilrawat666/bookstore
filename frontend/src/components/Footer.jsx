import React from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdCopyright } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[#e5e5e5] bg-[#f7f7f5] text-[#171717] dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex text-xl font-semibold tracking-tight"
            >
              Bookstore
            </Link>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
              Discover books worth reading and build a collection that stays
              with you.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/sahil-rawat25"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#e5e5e5] text-[#666666] transition-colors hover:border-[#315c4c] hover:text-[#315c4c] dark:border-[#303030] dark:text-[#a3a3a3] dark:hover:border-[#6f9f8b] dark:hover:text-[#6f9f8b]"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://www.instagram.com/_sahilrawat_099"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#e5e5e5] text-[#666666] transition-colors hover:border-[#315c4c] hover:text-[#315c4c] dark:border-[#303030] dark:text-[#a3a3a3] dark:hover:border-[#6f9f8b] dark:hover:text-[#6f9f8b]"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#171717] dark:text-[#f5f5f5]">
              Explore
            </h2>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                to="/"
                className="w-fit text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                Home
              </Link>

              <Link
                to="/books"
                className="w-fit text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                Books
              </Link>

              <Link
                to="/favourite"
                className="w-fit text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                Favourite Books
              </Link>

              <Link
                to="/cart"
                className="w-fit text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                Cart
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#171717] dark:text-[#f5f5f5]">
              Support
            </h2>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                to="/contact"
                className="w-fit text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                Contact Us
              </Link>

              <Link
                to="/user"
                className="w-fit text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                My Account
              </Link>

              <Link
                to="/login"
                className="w-fit text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                Login
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#e5e5e5] pt-5 dark:border-[#303030] sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1 text-xs text-[#666666] dark:text-[#a3a3a3]">
            <MdCopyright />
            {currentYear} Bookstore. All rights reserved.
          </p>

          <p className="text-xs text-[#666666] dark:text-[#a3a3a3]">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
