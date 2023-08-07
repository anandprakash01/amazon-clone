import React from "react";
import FooterMiddleList from "./FooterMiddleList";
import {middleList} from "../../constants";
import {logo, IndiaFlag} from "../../assets/index";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import {Facebook} from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import {Link} from "react-router-dom";

const FooterMiddle = () => {
  return (
    <div className="w-full bg-amazon_lite text-white">
      {/* ------------------top start---------------- */}

      <div className="w-full border-b-[1px] border-gray-500 p-10">
        <div className="max-w-5xl mx-auto text-gray-300">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-4 md:place-items-center md:items-start">
            {middleList.map((item) => {
              return (
                <FooterMiddleList
                  key={item.id}
                  title={item.title}
                  listItem={item.listItem}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------bottom start---------------- */}
      <div className="w-full flex gap-5 items-center justify-center py-6 md:flex-row xs:flex-col">
        <div className="flex gap-3 items-center justify-center duration-200 px-2 py-1">
          <div>
            <img className="w-20 pt-3" src={logo} alt="logo" />
          </div>
          <div className="flex gap-2">
            <p className="flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1">
              English
            </p>
          </div>
          <div className="flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1">
            <img className="w-6" src={IndiaFlag} alt="flagImg" />
            <p>India</p>
          </div>
        </div>
        <div className="flex gap-3 items-center justify-center duration-200 px-2 py-1">
          <Link to="https://www.linkedin.com/in/hranand/" target="_blank">
            <div className="hover:bg-amazon_yellow rounded-sm p-1">
              <LinkedInIcon />
            </div>
          </Link>
          <Link to="https://github.com/anandprakash01" target="_blank">
            <div className="hover:bg-amazon_yellow rounded-sm p-1">
              <GitHubIcon />
            </div>
          </Link>
          <Link to="https://www.instagram.com/hr_anand/" target="_blank">
            <div className="hover:bg-amazon_yellow rounded-sm p-1">
              <InstagramIcon />
            </div>
          </Link>
          <Link to="https://wa.me/7047867712" target="_blank">
            <div className="hover:bg-amazon_yellow rounded-sm p-1">
              <WhatsAppIcon />
            </div>
          </Link>

          <Link to="https://www.facebook.com/" target="_blank">
            <div className="hover:bg-amazon_yellow rounded-sm p-1">
              <Facebook />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterMiddle;
