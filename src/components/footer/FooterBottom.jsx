import React from "react";

import {footerBottomItem} from "../../constants";

const FooterBottom = () => {
  return (
    <div className="w-full bg-footerBottom py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="w-full grid grid-cols-2  md:grid-cols-4 mdl:grid-cols-5 gap-3 place-content-center text-gray-400">
          {footerBottomItem.map((item) => {
            return (
              <div className="group cursor-pointer" key={item.id}>
                <h3 className="w-24 font-semibold text-[12px] group-hover:underline text-[#DDD] Leading-3 mb-[2px]">
                  {item.title}
                </h3>
                <p className="w-24 tracking-tight text-[12px] text-[#999] group-hover:underline Leading-3">
                  {item.des}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
