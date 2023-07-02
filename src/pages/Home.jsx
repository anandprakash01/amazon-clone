import React from "react";
import Banner from "../components/home/Banner";
import Products from "../components/home/Products";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="w-full -mt-13 xl:-mt-35 pt-2 pb-10">
        <Products />
      </div>
    </div>
  );
};

export default Home;
