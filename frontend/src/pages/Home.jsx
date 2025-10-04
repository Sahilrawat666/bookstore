import React from "react";

import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Freebook from "../components/Freebook.jsx";
import Footer from "../components/Footer.jsx";
import NewsletterSection from "../components/NewsletterSection.jsx";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Freebook />
      <NewsletterSection />
      <Footer />
    </>
  );
}

export default Home;
