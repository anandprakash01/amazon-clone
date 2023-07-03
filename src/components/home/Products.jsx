import React, {useEffect} from "react";
import axios from "axios";
import {useLoaderData, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import ProductCard from "../productCard/ProductCard";

const Products = () => {
  // useEffect(() => {
  //   (async () => {
  //     const res = await axios.get(
  //       "https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products"
  //     );

  //     console.log(res.data);
  //   })();
  // }, []);

  const dispatch = useDispatch();

  // using useLoaderData
  const data = useLoaderData(); // provides the value returned from your route loader
  // console.log(data.data);
  const productData = data.data;

  const searchProducts = useSelector((state) => state.amazon.searchProducts);
  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10 px-4">
      {searchProducts.map((item) => (
        <ProductCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Products;
