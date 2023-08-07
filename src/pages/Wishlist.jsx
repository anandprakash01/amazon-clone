import React from "react";
import {useDispatch, useSelector} from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {useState, useEffect} from "react";
import {deleteItemWishlist, resetWishlist, addToCart} from "../redux/amazonSlice";
import {emptyCart} from "../assets/index";
import {Link} from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector((state) => state.amazon.wishlist);

  return (
    <div className="w-full bg-gray-100 p-4">
      {wishlistProducts.length > 0 ? (
        <div className="container mx-auto h-auto">
          <div className="w-full h-full bg-white px-4 col-span-4">
            <div className="font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3">
              <h2 className="text-3xl font-medium">Wishlist</h2>
              <h4 className="text-xl font-normal ">Subtotal</h4>
            </div>

            {/* ------------------products-------------------- */}
            <div>
              {wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className="w-full border-b-[1px] border-b-gray-300 p-4 flex items-center gap-6"
                >
                  <div className="w-full flex items-center gap-6">
                    <div className="w-1/5">
                      <img
                        className="w-full object-contain h-44"
                        src={p.image}
                        alt="image"
                      />
                    </div>
                    <div className="w-4/5">
                      <h2 className="font-semibold text-lg">{p.title}</h2>
                      <p className="text-sm">{p.description.substring(0, 125)}</p>
                      <div className="flex gap-4 items-center text-base ">
                        <p>Unit Price</p>
                        <div className="flex gap-1 items-center font-semibold">
                          <CurrencyRupeeIcon style={{fontSize: "1rem"}} />
                          <span>{(p.price * p.quantity * 82).toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => dispatch(deleteItemWishlist(p.id))}
                          className="bg-red-500 w-auto py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300 text-sm p-2"
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
                          className="bg-yellow-400 w-40 py-1 rounded-lg text-white mt-2  hover:bg-yellow-500 active:bg-red-900 duration-300 text-sm p-2"
                        >
                          Move to Cart
                        </button>
                      </div>
                    </div>
                    <div className="">
                      <p className="flex gap-1 items-center text-lg font-titleFont font-semibold">
                        <CurrencyRupeeIcon style={{fontSize: "1rem"}} />
                        <span>{(p.price * p.quantity * 82).toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-10">
              <div>Total Items: {wishlistProducts.length}</div>
              <button
                onClick={() => dispatch(resetWishlist())}
                className="px-10 py-1 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide"
              >
                Remove all
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
          <div className="w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg">
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
