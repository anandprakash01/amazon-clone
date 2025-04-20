import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const AboutUs = () => {
  const userInfo = useSelector(state => state.amazon.userInfo);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-amazon_blue mb-4">
          Welcome to Amazon Clone
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your one-stop destination for all your shopping needs. We strive to provide the
          best online shopping experience with quality products and excellent service.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-amazon_blue mb-3">Wide Selection</h3>
          <p className="text-gray-600">
            Browse through millions of products across various categories, from
            electronics to fashion.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-amazon_blue mb-3">Fast Delivery</h3>
          <p className="text-gray-600">
            Enjoy quick and reliable delivery services to get your products right at your
            doorstep.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-amazon_blue mb-3">Secure Shopping</h3>
          <p className="text-gray-600">
            Shop with confidence using our secure payment methods and data protection.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto bg-amazon_blue text-white rounded-lg p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg">
            To be Earth's most customer-centric company, where customers can find and
            discover anything they might want to buy online, at the best possible prices.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
        <div>
          <div className="text-4xl font-bold text-amazon_blue">10M+</div>
          <div className="text-gray-600">Products</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-amazon_blue">5M+</div>
          <div className="text-gray-600">Customers</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-amazon_blue">100+</div>
          <div className="text-gray-600">Countries</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-amazon_blue">24/7</div>
          <div className="text-gray-600">Support</div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ready to start shopping?
        </h2>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 rounded-md font-semibold"
          >
            Start Shopping
          </Link>
          {!userInfo && (
            <Link
              to="/registration"
              className="px-6 py-3 bg-white text-amazon_blue border border-amazon_blue rounded-md font-semibold hover:bg-gray-50"
            >
              Create Account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
