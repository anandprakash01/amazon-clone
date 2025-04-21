import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { resetCart } from "../redux/amazonSlice";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate total price
  const totalPrice = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Redirect to signin if not logged in
  React.useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [userInfo, navigate]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Clear the cart after successful payment
      dispatch(resetCart());
      setIsProcessing(false);
      navigate("/order-success");
    }, 2000);
  };

  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="container mx-auto h-auto flex flex-col gap-4">
        <div className="w-full h-full bg-white px-4 py-6 rounded-md">
          <div className="font-titleFont flex items-center py-3 border-b-[1px] border-b-gray-400">
            <h2 className="text-xl md:text-3xl font-medium">Payment</h2>
          </div>

          {cartProducts.length > 0 ? (
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              <div className="w-full md:w-2/3">
                <div className="bg-white p-4 rounded-md shadow-sm mb-4">
                  <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                  <p className="text-gray-700">{userInfo?.name || "User"}</p>
                  <p className="text-gray-700">ABC Road</p>
                  <p className="text-gray-700">City, State 12345</p>
                  <p className="text-gray-700">India</p>
                </div>

                <div className="bg-white p-4 rounded-md shadow-sm mb-4">
                  <h3 className="text-lg font-semibold mb-4">Review Items</h3>
                  <div className="max-h-60 overflow-y-auto">
                    {cartProducts.map(item => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-200"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-contain"
                        />
                        <div>
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          <p className="flex items-center text-sm">
                            <CurrencyRupeeIcon style={{fontSize: "0.8rem"}} />
                            <span>{(item.price * item.quantity * 82).toFixed(2)}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="mr-2"
                        />
                        <label htmlFor="card">Credit/Debit Card</label>
                      </div>

                      {paymentMethod === "card" && (
                        <div className="ml-6 space-y-3">
                          <div>
                            <label className="block text-sm mb-1">Card Number</label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                          <div className="flex gap-4">
                            <div className="w-1/2">
                              <label className="block text-sm mb-1">Expiry Date</label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full p-2 border border-gray-300 rounded"
                              />
                            </div>
                            <div className="w-1/2">
                              <label className="block text-sm mb-1">CVV</label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full p-2 border border-gray-300 rounded"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="upi"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={() => setPaymentMethod("upi")}
                          className="mr-2"
                        />
                        <label htmlFor="upi">UPI</label>
                      </div>

                      {paymentMethod === "upi" && (
                        <div className="ml-6 mt-3">
                          <label className="block text-sm mb-1">UPI ID</label>
                          <input
                            type="text"
                            placeholder="example@upi"
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="mr-2"
                        />
                        <label htmlFor="cod">Cash on Delivery</label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="w-full md:w-1/3">
                <div className="bg-white p-4 rounded-md shadow-sm sticky top-20">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Items:</span>
                      <span className="flex items-center">
                        <CurrencyRupeeIcon style={{fontSize: "0.8rem"}} />
                        <span>{(totalPrice * 82).toFixed(2)}</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-gray-200 pt-2 mt-2">
                      <span>Order Total:</span>
                      <span className="flex items-center">
                        <CurrencyRupeeIcon style={{fontSize: "0.8rem"}} />
                        <span>{(totalPrice * 82).toFixed(2)}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handlePaymentSubmit}
                    disabled={isProcessing}
                    className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-300 border hover:from-yellow-300 hover:to-yellow border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-2 rounded-md"
                  >
                    {isProcessing ? "Processing..." : "Place your order"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg">Your cart is empty. Please add items to proceed.</p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont text-semibold"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
