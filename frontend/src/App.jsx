import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Contact from "./pages/Contact.jsx";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import SearchResults from "./components/SearchResults";
import FavouriteBooks from "./pages/FavouriteBooks.jsx";
import Cart from "./pages/Cart.jsx";
import toast from "react-hot-toast";
import Books from "./pages/Books.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserProfile from "./components/UserProfile.jsx";

// import BookDescription from "./components/BookDescription.jsx";
// import Details from "./components/details.jsx";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  const LoginRedirect = () => {
    toast.error("Please login first!");
    return <Navigate to="/login" replace />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route
          path="/favourite"
          element={<FavouriteBooks userId={authUser?._id} />}
        />
        <Route path="/cart" element={<Cart userId={authUser?._id} />} />
        {/* <Route path="/user" element={<Dashboard />} /> */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserProfile />} />
        {/* <Route path="/user" element={<UserProfile />} /> */}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
