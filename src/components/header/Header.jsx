import React, {useRef, useState, useEffect} from "react";
import {Link, useLoaderData} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAuth, signOut} from "firebase/auth";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import {ArrowDropDownOutlined} from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {logo} from "../../assets/index";
import {allItems} from "../../constants";
import HeaderBottom from "./HeaderBottom";
import {setSearchProducts, userSignOut, setInputSearchVal} from "../../redux/amazonSlice";

const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const productsCart = useSelector((state) => state.amazon.products);
  const productsWishlist = useSelector((state) => state.amazon.wishlist);
  const inputVal = useSelector((state) => state.amazon.inputSearchVal);
  // console.log(productsCart);
  // console.log(userInfo);
  const data = useLoaderData();
  // const searchProducts = useSelector((state) => state.amazon.searchProducts);

  // console.log(data.data);

  const [showAll, setShowall] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [selected, setSelected] = useState("All");
  const refInput = useRef();

  if (inputVal == "") {
    dispatch(setSearchProducts(data.data));
  }

  const handleLogOut = () => {
    setShowall(false);
    setOpenUser(false);
    signOut(auth)
      .then(() => {
        dispatch(userSignOut());
        // console.log("signed out");
      })
      .catch((error) => {
        const errCode = error.code;
        const errMsg = error.message;
        console.log(errCode, errMsg);
      });
    // console.log(userInfo);
  };
  // console.log(userInfo);

  const handleSearch = () => {
    setShowall(false);
    setOpenUser(false);

    dispatch(setInputSearchVal(refInput.current.value));
    // console.log(refInput.current.value);
    dispatch(
      setSearchProducts(
        data.data.filter((prod) => {
          return prod.title.toLowerCase().includes(refInput.current.value.toLowerCase());
        })
      )
    );
    refInput.current.value = "";
  };

  const handlekeyDown = (e) => {
    setShowall(false);
    setOpenUser(false);
    // console.log(e.key);
    if (e.key == "Enter") {
      handleSearch();
    }
  };
  // console.log(searchProducts);
  // console.log(inputVal);

  return (
    <div className="w-full sticky top-0 z-50">
      <div className="w-full bg-amazon_blue text-white px-4 py-3 flex items-center gap-4">
        {/* ==================Image Start=================== */}
        <Link to="/">
          <div className="headerHover">
            <img className="w-24 mt-2" src={logo} alt="logo" />
          </div>
        </Link>

        {/* ==================Delivery Start===================  */}
        <div className="headerHover hidden mdl:inline-flex">
          <LocationOnIcon />
          <p className="text-sm text-lightText font-light flex flex-col">
            Delivery to{" "}
            <span className="text-sm font-semibold -mt-1 text-whiteText">India</span>
          </p>
        </div>
        {/* ==================Search Start=================== */}
        <div className="h-10 rounded-md  hidden lgl:flex flex-grow relative">
          <span
            onClick={() => setShowall(!showAll)}
            className=" h-full pl-2 bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md select-none"
          >
            {selected}
            <span>
              <ArrowDropDownOutlined />
            </span>
            {showAll && (
              <div>
                <ul className="absolute w-56 h-80 top-10 left-0 rounded-lg overflow-auto overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex-col gap-1 z-50">
                  {allItems.map((item) => {
                    return (
                      <li
                        onClick={() => {
                          setSelected(item.title);
                          setShowall(!showAll);
                        }}
                        key={item.id}
                        className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                      >
                        {item.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </span>
          <input
            // value={inputField}
            // onChange={handleSearch}
            onKeyDown={handlekeyDown}
            ref={refInput}
            placeholder="Search here"
            className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
            type="text"
          />
          <span
            className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg[#f3a847] duration-100 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md"
            onClick={handleSearch}
          >
            <SearchIcon />
          </span>
        </div>
        {/* ==================Signin Start=================== */}

        {userInfo ? (
          <div>
            <div
              className="flex flex-col items-start justify-center headerHover select-none"
              onClick={() => setOpenUser((pre) => !pre)}
            >
              <div className="flex flex-col mdl:flex-row items-center gap-1">
                {userInfo.photoURL ? (
                  <Avatar
                    alt="Avatar"
                    src={userInfo.photoURL}
                    sx={{
                      width: "1.5rem",
                      height: "1.5rem",
                      // display: "inline-block",
                    }}
                    className=""
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: "1.5rem",
                      height: "1.5rem",
                      // display: "inline-block",
                    }}
                  >
                    {userInfo.userName.split(" ")[0][0] +
                      userInfo.userName.split(" ")[1][0]}
                  </Avatar>
                )}
                <p className="text-xs text-white font-medium">
                  Hello, {userInfo.userName}
                </p>
              </div>
              <p className="text-sm font-semibold -mt-1 text-whiteText hidden mdl:inline-flex">
                Accounts & list{" "}
                <span>
                  <ArrowDropDownOutlined />
                </span>
              </p>
            </div>
            {openUser ? (
              <div className="absolute flex flex-col justify-center items-center bg-white text-black p-2 rounded-md border-black">
                <div className="flex flex-col mdl:flex-row items-center gap-1 border-black">
                  {userInfo.photoURL ? (
                    <Avatar
                      alt="Avatar"
                      src={userInfo.photoURL}
                      sx={{
                        width: "4rem",
                        height: "4rem",
                        // display: "inline-block",
                      }}
                      className=""
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: "4rem",
                        height: "4rem",
                        // display: "inline-block",
                      }}
                    >
                      {userInfo.userName.split(" ")[0][0] +
                        userInfo.userName.split(" ")[1][0]}
                    </Avatar>
                  )}
                </div>
                <div className="text-lg font-titleFont">{userInfo.userName}</div>
                <div className="text-[0.7rem]">{userInfo.email}</div>
              </div>
            ) : null}
          </div>
        ) : (
          <Link
            to="/signin"
            onClick={() => {
              setShowall(false);
              setOpenUser(false);
            }}
          >
            <div className="flex flex-col items-start justify-center headerHover">
              <p className="text-sm mdl:text-xs text-white mdl:text-lightText font-light">
                Hello, sign in
              </p>

              <p className="text-sm font-semibold -mt-1 text-whiteText hidden mdl:inline-flex">
                Accounts & list{" "}
                <span>
                  <ArrowDropDownOutlined />
                </span>
              </p>
            </div>
          </Link>
        )}

        {/* ==================Orders Start=================== */}

        <Link
          to="/returns&order"
          onClick={() => {
            setShowall(false);
            setOpenUser(false);
          }}
        >
          <div className="hidden lgl:flex flex-col items-start justify-center headerHover">
            <p className="text-xs text-lightText font-light">Returns</p>
            <p className="text-sm font-semibold -mt-1 text-whiteText">& Orders</p>
          </div>
        </Link>
        {/* ==================Card Start=================== */}
        <Link
          to="/wishlist"
          onClick={() => {
            setShowall(false);
            setOpenUser(false);
          }}
        >
          <div className="flex items-start justify-center headerHover relative">
            <FavoriteIcon />
            <p className="text-xs font-semibold mt-3 text-whiteText">
              <span className="absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
                {productsWishlist.length}
              </span>
            </p>
          </div>
        </Link>
        <Link
          to="/cart"
          onClick={() => {
            setShowall(false);
            setOpenUser(false);
          }}
        >
          <div className="flex items-start justify-center headerHover relative">
            <ShoppingCartIcon />
            <p className="text-xs font-semibold mt-3 text-whiteText">
              Cart{" "}
              <span className="absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
                {productsCart.length}
              </span>
            </p>
          </div>
        </Link>
        {/* ==================Card End=================== */}

        {userInfo && (
          <div onClick={handleLogOut} className="headerHover">
            <LogoutIcon />
          </div>
        )}
      </div>
      <HeaderBottom />
    </div>
  );
};

export default Header;
