import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLoaderData, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import ProductCard from "../productCard/ProductCard";
import PropagateLoader from "react-spinners/PropagateLoader";
import {setSearchProducts, setInputSearchVal} from "../../redux/amazonSlice";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // using useLoaderData
  // setLoading(true);
  const data = useLoaderData(); // provides the value returned from your route loader
  // console.log(data.data);
  // const productData = data.data;

  // if (data) {
  //   setLoading(false);
  // }

  // dispatch(setSearchProducts(data.data));// in re-renders this will set search array again

  const searchProducts = useSelector((state) => state.amazon.searchProducts);

  // if (loading) {
  //   return (
  //     <div className="mx-auto my-5">
  //       <PropagateLoader color="#00ab26" className="mx-auto" />
  //     </div>
  //   );
  // }

  return searchProducts.length == 0 ? (
    <h1 className="text-4xl text-extrabold text-center my-24">No Products Found !!</h1>
  ) : (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10 px-4">
      {searchProducts.map((item) => (
        <ProductCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Products;
