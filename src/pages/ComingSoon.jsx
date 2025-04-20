import React from "react";
import {Link, useLoaderData} from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold mt-32 mb-6 animate-bounce">
        Coming Soon!
      </h1>

      <p className="text-lg md:text-xl xs:mx-4 sml:mx-10 mb-8 text-center text-gray-600">
        We're working hard to bring you something amazing, Stay tuned for our exciting new
        features!
      </p>
      <div className="m-10 mb-32">
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

export default ComingSoon;
