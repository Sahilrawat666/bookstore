import React from "react";
import Navbar from "../components/Navbar";
import Cource from "../components/Cource";
import Footer from "../components/Footer";

function Courses() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Cource />
      </div>
      <Footer />
    </>
  );
}

export default Courses;
