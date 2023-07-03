import React from "react";
import Banner from "../components/home/Banner";
import Products from "../components/home/Products";
import {useSelector} from "react-redux";

const Home = () => {
  const searchArray = useSelector((state) => state.amazon.searchProducts);

  return (
    <div>
      {searchArray.length == 20 ? <Banner /> : null}
      <div className="w-full -mt-13 xl:-mt-35 pt-2 pb-10">
        <Products />
      </div>
    </div>
  );
};

export default Home;
