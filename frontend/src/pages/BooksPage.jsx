import React from "react";
import Navbar from "../components/Navbar";
import Books from "./Books";
import Footer from "../components/Footer";
import NewsletterSection from "../components/NewsletterSection.jsx";

function BooksPage() {
  return (
    <>
      <div className="min-h-screen">
        <Books />
      </div>
      <NewsletterSection />
    </>
  );
}

export default BooksPage;
