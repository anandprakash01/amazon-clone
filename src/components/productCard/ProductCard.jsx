import React from "react";
import {useNavigate} from "react-router";
import {addToCart} from "../../redux/amazonSlice";
import {useDispatch} from "react-redux";

import {Rating} from "@mui/material";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProductCard = ({item}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProduct = () => {
    navigate(`/product-details/${item.id}`);
  };

  return (
    <div
      key={item.id}
      className="bg-white h-auto border-[1px] border-gray-200 py-8 z-30 hover:border-transparent shadow-none hover:shadow-textShadow duration-200 flex flex-col gap-4 relative"
    >
      <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
        {item.category}
      </span>
      <div className="w-full h-auto flex items-center justify-center relative group">
        <img
          onClick={handleProduct}
          className="w-52 h-64 object-contain"
          src={item.image}
          alt=""
        />
        <ul className="w-full h-36 bg-gray-100 absolute -bottom-[160px] flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-1 border-r group-hover:bottom-0 duration-700">
          <li className="productHover">
            Compare
            <span>
              <ApiIcon />
            </span>
          </li>
          <li className="productHover">
            Add to Cart
            <span>
              <ShoppingCartIcon />
            </span>
          </li>
          <li className="productHover">
            View Details
            <span>
              <ArrowCircleRightIcon />
            </span>
          </li>
          <li className="productHover">
            Add to wish list
            <span>
              <FavoriteIcon />
            </span>
          </li>
        </ul>
      </div>

      <div className="px-4 z-10 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
            {item.title.substring(0, 15)}
          </h2>
          <p className="text-sm text-gray-600 font-semibold">
            ₹{(item.price * 82).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm">{item.description.substring(0, 90)}...</p>
          <div className="text-yellow-500">
            <Rating name="read-only" value={Math.floor(item.rating?.rate)} readOnly />
          </div>
        </div>
        <button
          onClick={() =>
            dispatch(
              addToCart({
                id: item.id,
                title: item.title,
                description: item.description,
                price: item.price,
                category: item.category,
                image: item.image,
                quantity: 1,
              })
            )
          }
          className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-200 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bt active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
