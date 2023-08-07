import React from "react";
import {useDispatch, useSelector} from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
  addToWishlist,
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  resetCart,
} from "../redux/amazonSlice";
import {emptyCart} from "../assets/index";
import {Link} from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.amazon.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

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
                        className="w-full object-contain h-44 cursor-pointer"
                        onClick={() => {
                          navigate(`/product-details/${p.id}`);
                        }}
                        src={p.image}
                        alt="image"
                      />
                    </div>
                    <div className="w-4/5">
                      <h2 className="font-semibold text-lg ">
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(`/product-details/${p.id}`);
                          }}
                        >
                          {p.title}
                        </span>
                      </h2>
                      <p className="text-sm">{p.description.substring(0, 125)}</p>
                      <div className="flex gap-5 items-center text-base ">
                        <p>Unit Price</p>
                        <p className="flex gap-2 items-center text-lg font-titleFont font-semibold">
                          <CurrencyRupeeIcon style={{fontSize: "1rem"}} />
                          <span>{(p.price * p.quantity * 82).toFixed(2)}</span>
                        </p>
                      </div>
                      <div className="bg-[#F0f2f2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md">
                        <p className="">Qty:</p>
                        <p
                          onClick={() => {
                            dispatch(decrementQuantity(p.id));
                          }}
                          className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300 select-none"
                        >
                          -
                        </p>
                        <p>{p.quantity}</p>
                        <p
                          onClick={() => {
                            dispatch(incrementQuantity(p.id));
                          }}
                          className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300 select-none"
                        >
                          +
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => dispatch(deleteItem(p.id))}
                          className="bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300"
                        >
                          Delete Item
                        </button>
                        <button
                          onClick={() => {
                            dispatch(
                              addToWishlist({
                                id: p.id,
                                title: p.title,
                                description: p.description,
                                price: p.price,
                                category: p.category,
                                image: p.image,
                                quantity: 1,
                              })
                            );
                            dispatch(deleteItem(p.id));
                          }}
                          className="bg-yellow-400 w-36 py-1 rounded-lg text-white mt-2 hover:bg-yellow-500 active:bg-red-900 duration-300"
                        >
                          Move to Wishlist
                        </button>
                      </div>
                    </div>
                    <div className="">
                      <p className="flex gap-2 items-center text-lg font-titleFont font-semibold">
                        <CurrencyRupeeIcon style={{fontSize: "1rem"}} />
                        <span>{(p.price * p.quantity * 82).toFixed(2)}</span>
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
                <div className="font-semibold px-10 py-1 flex items-center justify-between gap-2">
                  Total:{" "}
                  <div className="flex gap-1 items-center text-lg-font-bold">
                    <CurrencyRupeeIcon style={{fontSize: "1rem"}} />
                    <span>{(totalPrice * 82).toFixed(2)}</span>
                  </div>
                </div>
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
