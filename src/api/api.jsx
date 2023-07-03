import axios from "axios";

export const productsData = async () => {
  const products = await axios.get(
    "https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products"
  );
  // console.log(products);
  localStorage.setItem("products", JSON.stringify(products.data));
  // console.log(JSON.parse(localStorage.getItem("products")));
  return products;
};
