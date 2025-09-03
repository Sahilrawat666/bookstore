import React from "react";

import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Freebook from "../components/Freebook.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
  return (
    <>
      <div className="h-screen  w-full bg-[url('https://books.livingword.ph/wp-content/uploads/2021/08/livingword-online-bookstore-header-1920-2-min.jpg')] bg-cover bg-center">
        <Navbar />
        <Hero />
      </div>

      <Freebook />
      <Footer />
    </>
  );
}

export default Home;
