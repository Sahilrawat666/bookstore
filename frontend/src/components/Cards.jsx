/**
 * The `Cards` function is a React component that displays a card with product information and allows
 * users to navigate to a specific product page.
 * @returns The `Cards` component is being returned in the code snippet. It is a functional component
 * that takes an `item` prop and renders a card element displaying information about the item. The card
 * includes an image, name, category, price, and a "Buy now" button. The component also includes a
 * shopping cart icon that can be clicked to perform a specific action.
 */
import React from "react";
import { data, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";

function Cards({ item }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate(`/book/${item._id}`)}
        // onClick={handleBookClick}
        className="card mx-auto bg-base-100 w-63 mb-4 mt-4 shadow-xl hover:scale-105  cursor-pointer dark:bg-slate-900 dark:border-1  "
      >
        <MdOutlineShoppingCart className="absolute top-2 right-2 text-2xl text-black dark:text-white rounded-full hover:bg-red-400 p-1 border-1 " />
        <MdFavoriteBorder className="absolute top-10 right-2 text-2xl text-black dark:text-white rounded-full hover:bg-red-400 p-1 border-1 " />

        <figure className="w-30 h-48 mx-auto">
          <img src={item.image} />
        </figure>
        <div className="card-body duration-200 ">
          <h2 className="card-title font-bold rounded-box dpx-2 ">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p> {item.title} </p>
          <div className="card-actions justify-between">
            <div className="badge border-slate-400  dark:text-white dark:border-white dark:bg-slate-900 cursor-pointer  ">
              ${item.price}
            </div>

            <div className="badge  px-3 py-1 border[2px] border-slate-400 dark:text-white dark:border-white dark:bg-slate-900 hover:bg-pink-500 hover:text-white duration-200 ">
              Buy now
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
