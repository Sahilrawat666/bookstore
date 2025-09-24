import React from "react";
import "./Footer.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import { MdCopyright } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="w-full bg-slate-100 dark:bg-[#161616]">
        <div className="footer m-auto w-full">
          <div>
            <ul>
              <Link to="/about">
                <li className="cursor-pointer hover:underline text-sm sm:text-[15px] ">
                  About Us
                </li>
              </Link>
              <Link to="/contact">
                <li className="cursor-pointer hover:underline text-sm sm:text-[15px] ">
                  Contact Us
                </li>
              </Link>
              <li className="cursor-pointer hover:underline text-sm sm:text-[15px] ">
                Jobs
              </li>
              <li className="cursor-pointer hover:underline text-sm sm:text-[15px]">
                Press kit
              </li>
            </ul>

            <label className="footer-icons  flex gap-4 ">
              <a href="">
                <FaFacebookSquare className="font-bold size-5 cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200 " />
              </a>
              <a href="https://www.linkedin.com/in/sahil-rawat25?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                <FaLinkedin className="font-bold size-5 cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200" />
              </a>
              <a href="https://www.instagram.com/_sahilrawat_099?igsh=MTFwaWpoNzV3OTN0bg==">
                <FaInstagramSquare className="font-bold size-5 cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200" />
              </a>
            </label>

            <p className="flex items-center text-xs whitespace-nowrap sm:text-sm">
              copyright <MdCopyright /> 2025 - All right reserved by ACME
              industries Ltd
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
