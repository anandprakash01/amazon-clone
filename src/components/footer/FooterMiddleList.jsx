import React from "react";
import {middleList} from "../../constants";

const FooterMiddleList = ({title, listItem}) => {
  return (
    <div className="w-full">
      <h3 className="font-titleFont text-white text-base font-semibold mb-3">{title}</h3>
      <ul className="flex flex-col gap-2 font-bodyFont">
        {listItem.listData.map((item, i) => {
          return (
            <li key={i} className="footerLink">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterMiddleList;
