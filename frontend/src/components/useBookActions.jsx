// import { useAuth } from "../context/AuthProvider";
// import axios from "axios";
// import toast from "react-hot-toast";

// export const useBookActions = () => {
//   const [authUser, , cartCount, setCartCount, favCount, setFavCount] =
//     useAuth();

//   // add to favourite
//   const addToFavourite = async (bookId) => {
//     if (!authUser) {
//       toast.error("Please login first!");
//       return false; // return false if failed
//     }
//     try {
//       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/favourite`, {
//         userId: authUser._id,
//         bookId,
//       });
//       toast.success("Book added to favourites!");
//       setFavCount((prev) => prev + 1);
//       return true; // let the component know success
//     } catch (error) {
//       if (error.response?.data?.message === "Book already in favourites") {
//         toast.error("Book already in favourites!");
//       } else {
//         toast.error("Something went wrong.");
//         console.error(error.response?.data || error.message);
//       }
//       return false;
//     }
//   };

//   const removeFromFavourite = async (bookId) => {
//     if (!authUser?._id) return toast.error("Please login first!");
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_BACKEND_URL}/user/favourites/user/${
//           authUser._id
//         }/${bookId}`
//       );
//       toast.success("Removed from favourites");
//       setFavCount((prev) => (prev > 0 ? prev - 1 : 0));
//     } catch (err) {
//       toast.error("Error removing book");
//       console.error(err);
//     }
//   };

//   const addToCart = async (bookId) => {
//     if (!authUser?._id) return toast.error("Please login first!");
//     try {
//       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/cart`, {
//         userId: authUser._id,
//         bookId,
//       });
//       toast.success("Book added to cart!");
//       setCartCount((prev) => prev + 1);
//     } catch (error) {
//       if (error.response?.data?.message === "Book already in carts") {
//         toast.error("Book already in cart!");
//       } else {
//         toast.error("Something went wrong.");
//         console.error(error.response?.data || error.message);
//       }
//     }
//   };

//   const removeFromCart = async (bookId) => {
//     if (!authUser?._id) return toast.error("Please login first!");
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_BACKEND_URL}/user/carts/user/${
//           authUser._id
//         }/${bookId}`
//       );
//       toast.success("Removed from carts");
//       setCartCount((prev) => (prev > 0 ? prev - 1 : 0));
//     } catch (err) {
//       toast.error("Error removing book");
//       console.error(err);
//     }
//   };

//   return { addToFavourite, removeFromFavourite, addToCart, removeFromCart };
// };
