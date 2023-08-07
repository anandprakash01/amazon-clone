import React, {useEffect} from "react";
import Banner from "../components/home/Banner";
import Products from "../components/home/Products";
import {setInputSearchVal, setSearchProducts} from "../redux/amazonSlice";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";

const Home = () => {
  const inputVal = useSelector((state) => state.amazon.inputSearchVal);
  const searchProducts = useSelector((state) => state.amazon.searchProducts);
  const dispatch = useDispatch();
  // console.log(window.history);
  // const pre = document.referrer;
  // console.log(pre);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products"
        );

        // console.log(res.data);
        dispatch(setSearchProducts(res.data));
      } catch (error) {
        console.log("Error while calling API ", error);
      }
    })();
    dispatch(setInputSearchVal(""));
  }, []);

  return (
    <div>
      {inputVal ? null : <Banner />}
      <div className="w-full -mt-13 xl:-mt-35 pt-2 pb-10">
        <Products />
      </div>
    </div>
  );
};

export default Home;
