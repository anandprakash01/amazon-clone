import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {addToCart} from "../redux/amazonSlice";
import {useDispatch} from "react-redux";

import {Rating} from "@mui/material";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/${params.id}`
      );
      setProductInfo(res.data);
      // console.log(res.data);
    })();
  }, [params.id]);

  return (
    <div>
      <div className="bg-white w-full h-auto flex flex-row xs:flex-col sm:flex-col md:flex-row justify-center items-center px-52 py-24">
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
            <p className="text-xl font-semibold my-1">
              ₹{(productInfo.price * 82).toFixed(2)}
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
          <button
            onClick={() =>
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
              )
            }
            className="w-36 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-200 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bt active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
