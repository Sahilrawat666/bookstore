import React from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdCopyright } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-[#e5e5e5] bg-[#f7f7f5] text-[#171717] dark:border-[#303030] dark:bg-[#181818] dark:text-[#f5f5f5]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center">
              <span className="text-2xl font-semibold tracking-tight">
                Bookstore
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
              Discover books that inform, inspire, and entertain. Find your next
              great read from our growing collection.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/sahil-rawat25"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded border border-[#d9d9d9] text-[#555555] transition-colors hover:border-[#315c4c] hover:text-[#315c4c] dark:border-[#303030] dark:text-[#a3a3a3] dark:hover:border-[#6f9f8b] dark:hover:text-[#6f9f8b]"
              >
                <FaLinkedinIn size={16} />
              </a>

              <a
                href="https://www.instagram.com/_sahilrawat_099"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded border border-[#d9d9d9] text-[#555555] transition-colors hover:border-[#315c4c] hover:text-[#315c4c] dark:border-[#303030] dark:text-[#a3a3a3] dark:hover:border-[#6f9f8b] dark:hover:text-[#6f9f8b]"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717] dark:text-[#f5f5f5]">
              Store
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                Home
              </Link>

              <Link
                to="/books"
                className="text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                Books
              </Link>

              <Link
                to="/favourite"
                className="text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                Favourites
              </Link>

              <Link
                to="/cart"
                className="text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                Cart
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717] dark:text-[#f5f5f5]">
              Support
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/contact"
                className="text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                Contact Us
              </Link>

              <Link
                to="/user"
                className="text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                My Account
              </Link>

              <Link
                to="/login"
                className="text-sm text-[#666666] transition-colors hover:text-[#315c4c] dark:text-[#a3a3a3] dark:hover:text-[#6f9f8b]"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#e5e5e5] pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-[#303030]">
          <p className="flex items-center gap-1 text-xs text-[#666666] dark:text-[#a3a3a3]">
            <MdCopyright size={14} />
            {new Date().getFullYear()} Bookstore. All rights reserved.
          </p>

          <p className="text-xs text-[#888888] dark:text-[#777777]">
            Built with React
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
