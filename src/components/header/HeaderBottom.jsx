import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {KeyboardArrowRight} from "@mui/icons-material";
import {motion} from "framer-motion";

import SideNavContent from "./SideNavContent";
import {Avatar} from "@mui/material";

const HeaderBottom = () => {
  const userInfo = useSelector(state => state.amazon.userInfo);

  const [sidebar, setSideBar] = useState(false);
  const refSideNavContainer = useRef();

  useEffect(() => {
    const outsideClick = e => {
      if (e.target.contains(refSideNavContainer.current)) {
        setSideBar(false);
      }
    };
    if (sidebar) {
      document.body.addEventListener("click", outsideClick);
    }
    return () => {
      document.body.removeEventListener("click", outsideClick);
    };
  }, [refSideNavContainer, sidebar]);

  return (
    <div className="hidden mdl:flex w-full px-4 h-[36px] bg-amazon_lite text-white items-center">
      {/* ------------------ListItems start----------------------- */}
      <ul className="flex items-center gap-2 text-sm tracking-wide">
        <li
          className="headerHover items-center gap-1 hidden md:flex"
          onClick={() => setSideBar(!sidebar)}
        >
          <MenuIcon />
          All
        </li>
        <li className="headerHover">Today's Deals</li>
        <li className="headerHover">Today's Deals</li>
        <li className="headerHover">Customer Service</li>
        <li className="headerHover">Gift Cards</li>
        <li className="headerHover">Sell</li>
        <li className="headerHover">Registry</li>
      </ul>

      {/* ------------------SideNav start----------------------- */}
      {sidebar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-black bg-opacity-80">
          <div className="w-full h-full relative">
            <motion.div
              ref={refSideNavContainer}
              initial={{x: -500, opacity: 0}}
              animate={{x: 0, opacity: 1}}
              transition={{duration: 0.5}}
              className="w-[80%] md:w-[350px] h-full bg-white border border-black overflow-y-scroll"
            >
              <div className="w-full bg-amazon_lite text-white py-2 px-6 flex items-center gap-4">
                {userInfo ? (
                  <>
                    <Avatar
                      alt="Avatar"
                      src={userInfo?.photoURL}
                      sx={{
                        width: "2.5rem",
                        height: "2.5rem",
                      }}
                    >
                      {userInfo.userName.split(" ")[0][0] +
                        userInfo.userName.split(" ")[1][0]}
                    </Avatar>
                    <h3 className="font-titleFont font-bold text-lg tracking-wide">
                      Hello, {userInfo?.userName}
                    </h3>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <AccountCircleIcon sx={{fontSize: "2.5rem"}} />
                    <h3 className="font-titleFont font-bold text-lg tracking-wide">
                      Hello, Sign In
                    </h3>
                  </div>
                )}
              </div>

              <SideNavContent
                onClick={() => setSideBar(false)}
                title="Digital Content & Devices"
                links={[
                  {text: "Amazon Music", url: "/comming-soon"},
                  {text: "Kindle E-readers & Books", url: "/comming-soon"},
                  {text: "Amazon App store", url: "/comming-soon"},
                ]}
              />
              <SideNavContent
                onClick={() => setSideBar(false)}
                title="Shop By Department"
                links={[
                  {text: "Electronics", url: "/comming-soon"},
                  {text: "Computers", url: "/comming-soon"},
                  {text: "Smart Home", url: "/comming-soon"},
                ]}
              />
              <SideNavContent
                title="Programs & Features"
                onClick={() => setSideBar(false)}
                links={[
                  {text: "Gift Cards", url: "/comming-soon"},
                  {text: "Amazon live", url: "/comming-soon"},
                  {text: "International Shopping", url: "/comming-soon"},
                ]}
              />
              <SideNavContent
                onClick={() => setSideBar(false)}
                title="Help & Settings"
                links={[
                  {text: "Your Account", url: "/comming-soon"},
                  {text: "Customer Service", url: "/comming-soon"},
                  {text: "Contact Us", url: "/comming-soon"},
                ]}
              />
            </motion.div>
            <span
              onClick={() => setSideBar(false)}
              className="cursor-pointer absolute top-4 right-4 md:right-10 flex items-center justify-center text-white hover:text-red-500 duration-300"
            >
              <CloseIcon />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderBottom;
