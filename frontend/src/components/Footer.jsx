import React from "react";
import "./Footer.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
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
              <li className="cursor-pointer ">about us</li>
              <Link to="/contact">
                <li className="cursor-pointer ">contact</li>
              </Link>
              <li className="cursor-pointer ">jobs</li>
              <li className="cursor-pointer ">press kit</li>
            </ul>

            <label className="footer-icons flex gap-4 ">
              <FaFacebookSquare className="font-bold size-5 cursor-pointer " />
              <FaTwitterSquare className="font-bold size-5 cursor-pointer" />
              <FaInstagramSquare className="font-bold size-5 cursor-pointer" />
            </label>

            <p className="flex  items-center">
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
