import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem("User");
  const [authUser, setAuthUser] = useState(
    initialAuthUser ? JSON.parse(initialAuthUser) : undefined
  );

  //  Counts for cart and favourite
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  //🔹 Load counts from backend when user logs in
  useEffect(() => {
    if (!authUser?._id) return;

    const fetchCounts = async () => {
      try {
        const resCart = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/carts/${authUser._id}`
        );
        const resFav = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/favourites/${authUser._id}`
        );

        setCartCount(resCart.data.length);
        setFavCount(resFav.data.length);
      } catch (err) {
        console.error("Error fetching counts", err);
      }
    };

    fetchCounts();
  }, [authUser]);
  return (
    <AuthContext.Provider
      value={[
        authUser,
        setAuthUser,
        cartCount,
        setCartCount,
        favCount,
        setFavCount,
      ]}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
