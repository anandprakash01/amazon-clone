import React from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

const NoRoute = () => {
  const param = useParams();

  return (
    <div className="min-h-[80vh] bg-gray-50 flex flex-col justify-center items-center px-4 mt-10">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-amazon_blue mb-4">404</h1>
        <div className="text-6xl font-semibold text-gray-600 mb-8 animate-bounce">
          Oops!
        </div>
        <div className="text-xl text-gray-600 mb-8">
          <p className="mb-2">We can't find the page you're looking for.</p>
          <p className="text-red-500 font-mono bg-gray-100 px-4 py-2 rounded-md inline-block">
            "/{param.unknown}"
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">Here are some helpful links instead:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-2 bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput rounded-md font-semibold transform hover:scale-105 transition-transform duration-300"
            >
              Go to Home
            </Link>
            <Link
              to="/cart"
              className="px-6 py-2 bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput rounded-md font-semibold transform hover:scale-105 transition-transform duration-300"
            >
              View Cart
            </Link>
          </div>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          If you think this is a mistake, please{" "}
          <Link to="/coming-soon" className="text-amazon_blue hover:underline">
            contact support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoRoute;
