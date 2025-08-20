import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "././home/Home.jsx";
import Courses from "./courses/Courses.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Contact from "./contact/Contact.jsx";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider.jsx";
import BookDetails from "./components/BookDetails.jsx";

// import BookDescription from "./components/BookDescription.jsx";
// import Details from "./components/details.jsx";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/course"
          element={authUser ? <Courses /> : <Navigate to="/Signup" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/:id" element={<BookDetails />} />
        {/* <Route path="/book" element={<BookDetails />} /> */}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
