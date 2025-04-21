import React from "react";
import {Link} from "react-router-dom";

import {emptyCart} from "../assets";

const Returns = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 py-10">
      <div>
        <img
          className="w-80 rounded-lg p-4 mx-auto"
          src={emptyCart}
          alt="emptyCartImage"
        />
      </div>
      <div className="w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg">
        <h1 className="font-titleFont text-xl font-bold">No Order/Return</h1>
        <Link to="/">
          <button className="mt-6 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont text-semibold text-lg">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Returns;
