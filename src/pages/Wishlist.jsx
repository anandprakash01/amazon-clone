import React from "react";
import {useDispatch, useSelector} from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {useState, useEffect} from "react";
import {deleteItemWishlist, resetWishlist, addToCart} from "../redux/amazonSlice";
import {emptyCart} from "../assets/index";
import {Link, useNavigate} from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector((state) => state.amazon.wishlist);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-100 p-4">
      {wishlistProducts.length > 0 ? (
        <div className="container mx-auto h-auto flex flex-col gap-4">
          <div className="w-full h-full bg-white px-4">
            <div className="font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3">
              <h2 className="text-xl md:text-3xl font-medium">Wishlist</h2>
            </div>

            {/* ------------------products-------------------- */}
            <div>
              {wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className="w-full border-b-[1px] border-b-gray-300 p-2 md:p-4 flex flex-col items-center gap-4"
                >
                  <div className="w-full flex flex-row items-start gap-4">
                    <div className="flex flex-row items-start gap-4 w-full">
                      <div className="w-1/3 md:w-1/5">
                        <img
                          className="w-full object-contain h-24 sm:h-32 md:h-44 cursor-pointer"
                          src={p.image}
                          alt="image"
                          onClick={() => {
                            navigate(`/product-details/${p.id}`);
                          }}
                        />
                      </div>
                      <div className="w-2/3 md:w-4/5">
                        <h2 className="font-semibold text-sm sm:text-base md:text-lg text-left">
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              navigate(`/product-details/${p.id}`);
                            }}
                          >
                            {p.title}
                          </span>
                        </h2>
                        <p className="text-sm hidden md:block">{p.description.substring(0, 125)}</p>
                        <div className="flex gap-2 md:gap-5 items-center text-base justify-start">
                          <p className="text-sm sm:text-base">Price</p>
                          <div className="flex gap-1 md:gap-2 items-center text-base md:text-lg font-semibold">
                            <CurrencyRupeeIcon style={{fontSize: "0.8rem"}} />
                            <span>{(p.price * 82).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-wrap gap-3 justify-between">
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => dispatch(deleteItemWishlist(p.id))}
                        className="bg-red-500 w-auto py-1 rounded-lg text-white hover:bg-red-700 active:bg-red-900 duration-300 text-sm p-2"
                      >
                        Remove from Wishlist
                      </button>
                      <button
                        onClick={() => {
                          dispatch(
                            addToCart({
                              id: p.id,
                              title: p.title,
                              description: p.description,
                              price: p.price,
                              category: p.category,
                              image: p.image,
                              quantity: 1,
                            })
                          );
                          dispatch(deleteItemWishlist(p.id));
                        }}
                        className="bg-yellow-400 w-40 py-1 rounded-lg text-white hover:bg-yellow-500 active:bg-red-900 duration-300 text-sm p-2"
                      >
                        Move to Cart
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="flex gap-1 items-center text-base font-semibold justify-end">
                        <span className="text-sm mr-1">Item Total:</span>
                        <CurrencyRupeeIcon style={{fontSize: "0.8rem"}} />
                        <span>{(p.price * 82).toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full py-4 flex justify-center md:justify-start">
              <button
                onClick={() => dispatch(resetWishlist())}
                className="px-10 py-1 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide"
              >
                Clear Wishlist
              </button>
            </div>
          </div>
          
          <div className="w-full bg-white flex flex-col md:flex-row justify-between items-center p-4">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
              <h2 className="text-lg font-semibold">Wishlist Summary</h2>
              <p className="text-md">Total Items: <span className="font-semibold">{wishlistProducts.length}</span></p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="px-8 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-black font-semibold"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  navigate("/cart");
                }}
                className="px-8 py-2 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 duration-300 rounded-md text-white font-semibold"
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 py-10">
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCartImage"
            />
          </div>
          <div className="w-full max-w-xs sm:max-w-sm md:w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold">No Wishlist Products</h1>
            <Link to="/">
              <button className="mt-6 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont text-semibold text-lg">
                Add Items
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
