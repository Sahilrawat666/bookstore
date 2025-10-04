import React from "react";
import Navbar from "../components/Navbar";
import Books from "./Books";
import Footer from "../components/Footer";
import NewsletterSection from "../components/NewsletterSection.jsx";

function BooksPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Books />
      </div>
      <NewsletterSection />
      <Footer />
    </>
  );
}

export default BooksPage;
