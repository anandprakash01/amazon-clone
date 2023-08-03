import {KeyboardArrowRight} from "@mui/icons-material";
import React from "react";
import {Link} from "react-router-dom";

const SideNavContent = ({title, one, two, three}) => {
  return (
    <div className="py-3 border-b-[1px] border-b-gray-300">
      <h3 className="text-lg font-titleFont font-semibold mb-1 px-6">{title}</h3>
      <ul className="text-sm">
        <Link to="/comming-soon">
          <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
            {one}
            <span>
              <KeyboardArrowRight />
            </span>
          </li>
          <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
            {two}
            <span>
              <KeyboardArrowRight />
            </span>
          </li>
          <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer ">
            {three}
            <span>
              <KeyboardArrowRight />
            </span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SideNavContent;
