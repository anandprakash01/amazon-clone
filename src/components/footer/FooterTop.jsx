import React from "react";
import {Link} from "react-router-dom";

const FooterTop = () => {
  return (
    <div className="w-full bg-white py-6">
      <div>
        <div className="w-64 mx-auto text-center flex flex-col gap-1">
          <p className="text-sm">See Personalised recommendation</p>
          <Link to="/signin">
            <button className="w-full bg-yellow-400 rounded-md py-1 font-semibold hover:bg-yellow-500 active:bg-yellow-700">
              Sign In
            </button>
          </Link>
          <p>
            New Customer?{" "}
            <Link to="/registration">
              <span className="text-blue-600 ml-1 cursor-pointer">Start here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
