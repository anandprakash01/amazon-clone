import React from "react";
import {useDispatch, useSelector} from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {useState, useEffect} from "react";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  resetCart,
} from "../redux/amazonSlice";
import {emptyCart} from "../assets/index";
import {Link} from "react-router-dom";

export const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.amazon.products);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    cartProducts.map((item) => {
      total += item.price * item.quantity;
      return setTotalPrice(total);
    });
  }, [cartProducts]);

  return (
    <div className="w-full bg-gray-100 p-4">
      {cartProducts.length > 0 ? (
        <div className="container mx-auto h-auto grid grid-cols-5 gap-8">
          <div className="w-full h-full bg-white px-4 col-span-4">
            <div className="font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3">
              <h2 className="text-3xl font-medium">Shopping Cart</h2>
              <h4 className="text-xl font-normal ">Subtotal</h4>
            </div>

            {/* ------------------products-------------------- */}
            <div>
              {cartProducts.map((p) => (
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
                      <p className="text-base ">
                        Unit Price{"  "}
                        <span className="font-semibold">
                          ₹{(p.price * 82).toFixed(2)}
                        </span>
                      </p>
                      <div className="bg-[#F0f2f2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md">
                        <p className="">Qty:</p>
                        <p
                          onClick={() => {
                            dispatch(decrementQuantity(p.id));
                          }}
                          className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300"
                        >
                          -
                        </p>
                        <p>{p.quantity}</p>
                        <p
                          onClick={() => {
                            dispatch(incrementQuantity(p.id));
                          }}
                          className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300"
                        >
                          +
                        </p>
                      </div>
                      <button
                        onClick={() => dispatch(deleteItem(p.id))}
                        className="bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300"
                      >
                        Delete Item
                      </button>
                    </div>
                    <div className="">
                      <p className="text-lg font-titleFont font-semibold">
                        ₹{(p.price * p.quantity * 82).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div onClick={() => dispatch(resetCart())} className="w-full py-2">
              <button className="px-10 py-1 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide">
                Clear Cart
              </button>
            </div>
          </div>
          <div className="w-full h-52 bg-white col-span-1 flex flex-col justify-center items-center p-4">
            <div>
              <p className="flex gap-2 items-start text-sm">
                <span className="bg-white text-green-500 rounded-full">
                  <CheckCircleIcon />
                </span>{" "}
                Your order qualifies for FREE shopping choose this option at checkout. See
                details...
              </p>

              <div>
                <p className="font-semibold px-10 py-1 flex items-center justify-between gap-2">
                  Total:{" "}
                  <span className="text-lg-font-bold">
                    ₹{(totalPrice * 82).toFixed(2)}
                  </span>
                </p>
              </div>
              <button className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-300 border hover:from-yellow-300 hover:to-yellow border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3">
                Proceed to payment
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
            <h1 className="font-titleFont text-xl font-bold">No Products</h1>
            <Link to="/">
              <button className="mt-6 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont text-semibold text-lg">
                Countinue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
