import React, {useState} from "react";
import {useNavigate} from "react-router";
import {
  addToCart,
  deleteItem,
  addToWishlist,
  deleteItemWishlist,
} from "../../redux/amazonSlice";
import {useDispatch, useSelector} from "react-redux";

import {Rating} from "@mui/material";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const ProductCard = ({item}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [isProductInCart, setIsProductInCart] = useState(false);
  // const [toggle, setToggle] = useState();
  const cartProducts = useSelector((state) => state.amazon.products);
  const wishlistProducts = useSelector((state) => state.amazon.wishlist);

  const handleProductDetailPage = () => {
    navigate(`/product-details/${item.id}`);
  };
  const handleAddToCart = () => {
    // setToggle(!toggle);
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
    );
  };

  const handleDeleteItem = () => {
    // setToggle(!toggle);
    dispatch(deleteItem(item.id));
  };

  const handleAddToWishlist = () => {
    dispatch(
      addToWishlist({
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        quantity: 1,
      })
    );
  };
  const handleDeleteWishlist = () => {
    dispatch(deleteItemWishlist(item.id));
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
          onClick={handleProductDetailPage}
          className="w-52 h-64 object-contain"
          src={item.image}
          alt=""
        />
        <ul className="w-full h-36 bg-gray-100 absolute -bottom-[160px] flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-1 border-r group-hover:bottom-0 duration-700">
          <li className="productHover" onClick={handleAddToCart}>
            Add to Cart
            <span>
              <ShoppingCartIcon />
            </span>
          </li>
          <li className="productHover" onClick={handleProductDetailPage}>
            View Details
            <span>
              <ArrowCircleRightIcon />
            </span>
          </li>
          <li className="productHover" onClick={handleAddToWishlist}>
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
          <p className="flex gap-1 items-center text-sm text-gray-600 font-semibold">
            <CurrencyRupeeIcon style={{fontSize: "1rem"}} />
            <span>{(item.price * 82).toFixed(2)}</span>
          </p>
        </div>
        <div>
          <p className="text-sm">{item.description.substring(0, 90)}...</p>
          <div className="text-yellow-500">
            <Rating
              name="read-only"
              value={Math.floor(item.rating?.rate)}
              // precision={0.5}
              readOnly
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          {cartProducts.find((product) => product.id == item.id) ? (
            <button
              onClick={handleDeleteItem}
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
          {wishlistProducts.find((prod) => prod.id == item.id) ? (
            <button
              className="w-10 ml-5 mt-3 text-red-700"
              onClick={handleDeleteWishlist}
            >
              <FavoriteIcon />
            </button>
          ) : (
            <button
              className="w-10 ml-5 mt-3 text-gray-300"
              onClick={handleAddToWishlist}
            >
              <FavoriteIcon className="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
