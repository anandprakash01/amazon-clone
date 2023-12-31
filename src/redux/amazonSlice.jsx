import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  products: [], //Cart Products
  userInfo: null,
  searchProducts: [],
  wishlist: [],
  inputSearchVal: "",
};

export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    //set input
    setInputSearchVal: (state, action) => {
      state.inputSearchVal = action.payload;
    },
    //cart
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id == action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id == action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter((item) => item.id != action.payload);
    },
    resetCart: (state) => {
      state.products = [];
    },

    setSearchProducts: (state, action) => {
      state.searchProducts = action.payload;
    },

    //wishlist
    addToWishlist: (state, action) => {
      const item = state.wishlist.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.wishlist.push(action.payload);
      }
    },
    deleteItemWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item.id != action.payload);
    },
    resetWishlist: (state) => {
      state.wishlist = [];
    },

    //user auth
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    userSignOut: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  setInputSearchVal,

  addToCart,
  deleteItem,
  resetCart,
  incrementQuantity,
  decrementQuantity,

  addToWishlist,
  deleteItemWishlist,
  resetWishlist,

  setUserInfo,
  userSignOut,
  setSearchProducts,
} = amazonSlice.actions;
export default amazonSlice.reducer;
