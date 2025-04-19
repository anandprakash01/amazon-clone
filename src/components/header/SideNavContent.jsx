import {KeyboardArrowRight} from "@mui/icons-material";
import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const SideNavContent = ({title, links, onClick}) => {
  return (
    <div className="py-3 border-b-[1px] border-b-gray-300">
      <h3 className="text-lg font-titleFont font-semibold mb-1 px-6">{title}</h3>

      {links?.map((link, index) => (
        <ul className="text-sm" key={index}>
          <div>
            <Link
              onClick={onClick}
              to={link.url}
              className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer"
            >
              {link.text}
              <span>
                <KeyboardArrowRight />
              </span>
            </Link>
          </div>
        </ul>
      ))}
    </div>
  );
};

SideNavContent.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

export default SideNavContent;
