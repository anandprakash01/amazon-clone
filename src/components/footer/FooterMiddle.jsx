import React from "react";
import {Link} from "react-router-dom";

import {middleList} from "../../constants";

import {logo, IndiaFlag} from "../../assets/index";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import {Facebook} from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const FooterMiddle = () => {
  const listFooterLinks = [
    {
      title: "Get to Know us",
      listData: [
        {text: "About us", url: "/about-us"},
        {text: "Customer Service", url: "/customer-service"},
        {text: "Customer Stories", url: "/customer-stories"},
        {text: "Privacy Policy", url: "/privacy-policy"},
      ],
    },
    {
      title: "Contact with us",

      listData: [
        {text: "Contact us", url: "/contact-us"},
        {text: "Linkedin", url: "https://www.linkedin.com/in/anandprakash21/"},
        {text: "Github", url: "https://github.com/anandprakash01"},
        {text: "Instagram", url: "https://www.instagram.com/hr_anand/"},
      ],
    },
  ];

  return (
    <div className="w-full bg-amazon_lite text-white">
      {/* ------------------top start---------------- */}

      <div className="w-full border-b-[1px] border-gray-500 p-10">
        <div className="max-w-5xl mx-auto text-gray-300">
          <div className="w-full grid grid-cols-2 mdl:grid-cols-2 md:place-items-center md:items-start gap-5">
            {listFooterLinks.map((item, index) => {
              return (
                <div key={index} className="w-full">
                  <h3 className="font-titleFont text-white xs:text-sm sml:text-base font-semibold md:mb-3">
                    {item.title}
                  </h3>
                  <ul className="flex flex-col xs:gap-1 md:gap-2 font-bodyFont">
                    {item.listData.map((data, i) => {
                      return (
                        <Link key={i} to={data.url}>
                          <li className="footerLink xs:text-xs md:text-sm">
                            {data.text}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
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
          <Link to="https://www.linkedin.com/in/anandprakash21/" target="_blank">
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

          {/* <Link to="https://www.facebook.com/" target="_blank">
            <div className="hover:bg-amazon_yellow rounded-sm p-1">
              <Facebook />
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default FooterMiddle;
