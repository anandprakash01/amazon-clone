import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {
  addToCart,
  deleteItem,
  addToWishlist,
  deleteItemWishlist,
} from "../redux/amazonSlice";
import {useDispatch, useSelector} from "react-redux";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import {Rating} from "@mui/material";
import ProductCard from "../components/productCard/ProductCard";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [productInfo, setProductInfo] = useState({});

  const cartProducts = useSelector((state) => state.amazon.products);
  const searchProducts = useSelector((state) => state.amazon.searchProducts);
  const wishlistProducts = useSelector((state) => state.amazon.wishlist);
  const inputSearchVal = useSelector((state) => state.amazon.inputSearchVal);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/${params.id}`
      );
      // console.log(res.data);
      setProductInfo(res.data);
    })();
  }, [params.id]);

  // if (inputSearchVal) {
  //   navigate("/");
  // }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: productInfo.id,
        title: productInfo.title,
        description: productInfo.description,
        price: productInfo.price,
        category: productInfo.category,
        image: productInfo.image,
        quantity: 1,
      })
    );
  };

  const handleOrderNow = () => {
    dispatch(
      addToCart({
        id: productInfo.id,
        title: productInfo.title,
        description: productInfo.description,
        price: productInfo.price,
        category: productInfo.category,
        image: productInfo.image,
        quantity: 1,
      })
    );
    navigate("/cart");
  };

  const handleAddToWishlist = () => {
    dispatch(
      addToWishlist({
        id: productInfo.id,
        title: productInfo.title,
        description: productInfo.description,
        price: productInfo.price,
        category: productInfo.category,
        image: productInfo.image,
        quantity: 1,
      })
    );
  };
  return (
    <div>
      <div className="bg-white w-full h-auto flex flex-row xs:flex-col sm:flex-col md:flex-row justify-center items-center px-52 xs:px-10 sm:px-10 md:px-10 mdl:px-20 lg:px-52 py-10">
        <img
          className="w-80 h-96 object-contain"
          src={productInfo.image}
          alt="Product Image"
        />

        <div className="px-10 z-10 bg-white">
          <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
            {productInfo.title}
          </h2>
          <div>
            <p className="text-sm">{productInfo.description}</p>
            <p className="flex gap-1 items-center text-xl font-semibold my-1">
              <CurrencyRupeeIcon style={{fontSize: "1.5rem"}} />
              <span>{(productInfo.price * 82).toFixed(2)}</span>
            </p>

            <div className="text-yellow-500">
              <Rating
                name="read-only"
                value={Math.floor(productInfo.rating?.rate)}
                readOnly
              />
              <p className="text-xs text-gray-500">{productInfo.rating?.count} Ratings</p>
            </div>
          </div>
          <div className="text-base">
            {Math.floor(productInfo.rating?.rate) > 3
              ? `Best in ${productInfo.category}`
              : ""}
          </div>
          {wishlistProducts.find((product) => product.id == params.id) ? (
            <button
              onClick={() => dispatch(deleteItemWishlist(params.id))}
              className="bg-red-500 text-white w-full font-titleFont font-medium text-base py-1.5 rounded-md mt-3 hover:bg-red-700 active:bg-red-900 duration-300 border-red-700"
            >
              Remove from Wishlist
            </button>
          ) : (
            <button
              onClick={handleAddToWishlist}
              className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-200 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bt active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3"
            >
              Wishlist
            </button>
          )}
          {cartProducts.find((product) => product.id == params.id) ? (
            <button
              onClick={() => dispatch(deleteItem(params.id))}
              className="bg-red-500 text-white w-full font-titleFont font-medium text-base py-1.5 rounded-md mt-3 hover:bg-red-700 active:bg-red-900 duration-300 border-red-700"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-200 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bt active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3"
            >
              Add to Cart
            </button>
          )}
          <button
            onClick={handleOrderNow}
            className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-200 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bt active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* ---------------------------- */}

      <div className="flex justify-center font-titleFont text-xl mt-5">
        See more products
      </div>
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10 px-4 py-5">
        {searchProducts.map((item) =>
          item.id == productInfo.id ? null : <ProductCard item={item} key={item.id} />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
