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
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {logo} from "../../assets/index";
import {allItems} from "../../constants";
import HeaderBottom from "./HeaderBottom";
import {setSearchProducts, userSignOut, setInputSearchVal} from "../../redux/amazonSlice";

const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.amazon.userInfo);
  const productsCart = useSelector(state => state.amazon.products);
  const productsWishlist = useSelector(state => state.amazon.wishlist);
  const inputVal = useSelector(state => state.amazon.inputSearchVal);
  const data = useLoaderData();

  const [showAll, setShowall] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [selected, setSelected] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);
  const refInput = useRef();

  if (inputVal == "") {
    dispatch(setSearchProducts(data.data));
  }

  const handleLogOut = () => {
    setShowall(false);
    setOpenUser(false);
    setMobileMenu(false);
    signOut(auth)
      .then(() => {
        dispatch(userSignOut());
      })
      .catch(error => {
        const errCode = error.code;
        const errMsg = error.message;
        console.log(errCode, errMsg);
      });
  };

  const handleSearch = () => {
    setShowall(false);
    setOpenUser(false);
    setMobileMenu(false);

    dispatch(setInputSearchVal(refInput.current.value));
    dispatch(
      setSearchProducts(
        data.data.filter(prod => {
          return prod.title.toLowerCase().includes(refInput.current.value.toLowerCase());
        })
      )
    );
    refInput.current.value = "";
  };

  const handlekeyDown = e => {
    setShowall(false);
    setOpenUser(false);
    setMobileMenu(false);
    if (e.key == "Enter") {
      handleSearch();
    }
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setShowall(false);
    setOpenUser(false);
  };

  return (
    <div className=" sticky top-0 z-50">
      <div className="w-full bg-amazon_blue text-white px-2 py-2 xs:py-3 flex items-center justify-between gap-1 md:gap-2">
        {/* ==================Mobile Menu Icon Start=================== */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="text-white md:p-1"
          >
            <MenuIcon />
          </button>
        </div>

        {/* ==================Logo Start=================== */}
        <Link to="/" className="hidden md:flex" onClick={closeMobileMenu}>
          <div className="headerHover">
            <img className="w-20 sm:w-24 mt-1 sm:mt-2" src={logo} alt="logo" />
          </div>
        </Link>

        {/* ==================Delivery to===================  */}
        <div className="headerHover hidden mdl:inline-flex items-center">
          <LocationOnIcon sx={{fontSize: "1.4rem"}} />
          <div className="text-xs leading-tight">
            <span className="text-lightText">Delivery to</span>
            <p className="text-xs font-semibold text-whiteText">India</p>
          </div>
        </div>

        {/* ==================Search Start=================== */}
        <div className="xs:h-8 md:h-10 rounded-md flex relative flex-grow">
          <span
            onClick={() => {
              setShowall(!showAll);
              setOpenUser(false);
              setMobileMenu(false);
            }}
            className="h-full pl-2 bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md select-none"
          >
            <span className="hidden xs:inline-flex">{selected}</span>
            <span>
              <ArrowDropDownOutlined />
            </span>
            {showAll && (
              <div>
                <ul className="absolute w-56 h-80 top-10 left-0 rounded-lg overflow-auto overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex-col gap-1 z-50">
                  {allItems.map(item => {
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
            onKeyDown={handlekeyDown}
            ref={refInput}
            placeholder="Search here"
            className="h-full w-full xs:text-xs md:text-base text-amazon_blue outline-none border-none px-2"
            type="text"
          />
          <span
            className="w-8 md:w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg[#f3a847] duration-100 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md"
            onClick={handleSearch}
          >
            <SearchIcon />
          </span>
        </div>

        {/* ==================Orders Start=================== */}
        <Link to="/returns&order" onClick={closeMobileMenu} className="hidden lgl:flex">
          <div className="flex flex-col items-start justify-center headerHover">
            <p className="text-xs text-lightText font-light">Returns</p>
            <p className="text-sm font-semibold -mt-1 text-whiteText">& Orders</p>
          </div>
        </Link>

        {/* ==================Wishlist Start=================== */}
        <Link to="/wishlist" onClick={closeMobileMenu}>
          <div className="flex items-start justify-center headerHover relative">
            <FavoriteIcon />
            <p className="text-xs font-semibold mt-3 text-whiteText hidden lg:inline-flex">
              Wishlist
              <span className="absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
                {productsWishlist.length}
              </span>
            </p>
            <span className="absolute text-xs -top-1 left-3 xs:left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center lg:hidden">
              {productsWishlist.length}
            </span>
          </div>
        </Link>

        {/* ==================Cart Start=================== */}
        <Link to="/cart" onClick={closeMobileMenu}>
          <div className="flex items-start justify-center headerHover relative">
            <ShoppingCartIcon />
            <p className="text-xs font-semibold mt-3 text-whiteText hidden lg:inline-flex">
              Cart
              <span className="absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
                {productsCart.length}
              </span>
            </p>
            <span className="absolute text-xs -top-1 left-3 xs:left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center lg:hidden">
              {productsCart.length}
            </span>
          </div>
        </Link>

        {/* ==================Signin Start=================== */}
        {userInfo ? (
          <div className="relative">
            <div
              className="headerHover select-none"
              onClick={() => {
                setOpenUser(pre => !pre);
                setShowall(false);
                setMobileMenu(false);
              }}
            >
              <div className="flex flex-row items-center gap-1">
                {userInfo.photoURL ? (
                  <Avatar
                    alt="Avatar"
                    src={userInfo.photoURL}
                    sx={{
                      width: "1.5rem",
                      height: "1.5rem",
                    }}
                    className=""
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: "1.5rem",
                      height: "1.5rem",
                    }}
                  >
                    {userInfo.userName.split(" ")[0][0] +
                      userInfo.userName.split(" ")[1][0]}
                  </Avatar>
                )}
                <p className="text-xs text-white font-medium hidden md:flex">
                  Hello, {userInfo.userName.split(" ")[0]}
                </p>
              </div>
            </div>
            {openUser && (
              <div className="absolute flex flex-col mt-[1px] gap-3 justify-center items-center bg-white text-black p-2 rounded-md border-black border-[1px] right-0 w-60">
                <div className="flex flex-col pt-5 items-center gap-1 border-black">
                  {userInfo.photoURL ? (
                    <Avatar
                      alt="Avatar"
                      src={userInfo.photoURL}
                      sx={{
                        width: "4rem",
                        height: "4rem",
                      }}
                      className=""
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: "4rem",
                        height: "4rem",
                      }}
                    >
                      {userInfo.userName.split(" ")[0][0] +
                        userInfo.userName.split(" ")[1][0]}
                    </Avatar>
                  )}
                </div>
                <div className="text-lg font-titleFont">{userInfo.userName}</div>
                <div className="text-[0.7rem] pb-5">{userInfo.email}</div>
                <div
                  onClick={handleLogOut}
                  className="w-full flex items-center justify-center py-2 bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer"
                >
                  <LogoutIcon className="mr-2" />
                  Sign Out
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signin" onClick={closeMobileMenu} className="hidden xs:flex">
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

        {/* ==================Logout Button (Desktop)=================== */}
        {userInfo && (
          <div onClick={handleLogOut} className="headerHover hidden md:flex">
            <LogoutIcon />
          </div>
        )}
      </div>

      {/* ==================Mobile Menu=================== */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 md:hidden">
          <div className="bg-amazon_blue h-full w-[70%] max-w-[300px] flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-gray-700 flex items-center bg-amazon_lite">
              {userInfo ? (
                <div className="flex items-center gap-2">
                  {userInfo.photoURL ? (
                    <Avatar
                      alt="Avatar"
                      src={userInfo.photoURL}
                      sx={{width: "2rem", height: "2rem"}}
                    />
                  ) : (
                    <Avatar sx={{width: "2rem", height: "2rem"}}>
                      {userInfo.userName.split(" ")[0][0] +
                        userInfo.userName.split(" ")[1][0]}
                    </Avatar>
                  )}
                  <p className="text-white font-medium">
                    Hello, {userInfo.userName.split(" ")[0]}
                  </p>
                </div>
              ) : (
                <Link
                  to="/signin"
                  onClick={closeMobileMenu}
                  className="text-white font-medium flex items-center gap-2"
                >
                  <AccountCircleIcon />
                  Sign In
                </Link>
              )}
            </div>

            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-bold mb-2">Shop By Category</h3>
              <ul className="text-gray-200">
                {allItems.slice(0, 8).map(item => (
                  <li
                    key={item.id}
                    className="py-2 hover:text-white transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-bold mb-2">Account & Settings</h3>
              <ul className="text-gray-200">
                <li className="py-2 hover:text-white transition-colors">
                  <Link to="/account" onClick={closeMobileMenu}>
                    Your Account
                  </Link>
                </li>
                <li className="py-2 hover:text-white transition-colors">
                  <Link to="/returns&order" onClick={closeMobileMenu}>
                    Returns & Orders
                  </Link>
                </li>
                <li className="py-2 hover:text-white transition-colors">
                  <Link to="/wishlist" onClick={closeMobileMenu}>
                    Your Wishlist
                  </Link>
                </li>
                <li className="py-2 hover:text-white transition-colors">
                  <Link to="/cart" onClick={closeMobileMenu}>
                    Your Cart
                  </Link>
                </li>
                {userInfo && (
                  <li
                    className="py-2 text-red-400 hover:text-red-300 transition-colors"
                    onClick={handleLogOut}
                  >
                    Sign Out
                  </li>
                )}
              </ul>
            </div>

            <button
              onClick={closeMobileMenu}
              className="absolute top-4 right-4 text-white hover:text-red-500"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <HeaderBottom />
    </div>
  );
};

export default Header;
