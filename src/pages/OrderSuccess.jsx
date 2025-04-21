import React from "react";
import {useNavigate} from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="container mx-auto h-auto flex flex-col gap-4">
        <div className="w-full h-full bg-white px-4 py-10 rounded-md flex flex-col items-center">
          <div className="text-green-500 mb-4">
            <CheckCircleIcon style={{fontSize: "5rem"}} />
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            Thank you for your purchase. Your order has been placed and will be processed
            soon.
          </p>

          <div className="">
            <button
              onClick={() => navigate("/")}
              className="bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont text-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
