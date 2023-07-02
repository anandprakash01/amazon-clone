import React, {Component, useState} from "react";
import Slider from "react-slick";

import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  bannerImgFour,
  bannerImgFive,
} from "../../assets/index";

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (pre, next) => {
      setDotActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "75%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "180px",
        }}
      >
        <ul
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                background: "#fff",
                // padding: "8px 0",
                cursor: "pointer",
                border: "1px solid #f3a847",
              }
            : {
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                background: "#232F3E",
                // padding: "8px 0",
                cursor: "pointer",
                border: "1px solid white",
              }
        }
      ></div>
    ),
  };

  return (
    <div className="w-full ">
      <div className="w-full h-full relative">
        <Slider {...settings}>
          <div>
            <img src={bannerImgOne} alt="banner Image" />
          </div>
          <div>
            <img src={bannerImgTwo} alt="banner Image" />
          </div>
          <div>
            <img src={bannerImgThree} alt="banner Image" />
          </div>
          <div>
            <img src={bannerImgFour} alt="banner Image" />
          </div>
          <div>
            <img src={bannerImgFive} alt="banner Image" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
