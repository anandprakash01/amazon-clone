import React from "react";
import {Link, useLoaderData} from "react-router-dom";

const CommingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-2 m-10 mt-28 text-3xl font-bold">
        This feature is Comming Soon
      </div>
      <div className="m-10">
        <Link
          to="/"
          className="p-1.5 m-5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
        >
          Go back to Home
        </Link>
        <Link
          to="/cart"
          className="p-1.5 m-5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
        >
          Go to Cart
        </Link>
      </div>
    </div>
  );
};

export default CommingSoon;
