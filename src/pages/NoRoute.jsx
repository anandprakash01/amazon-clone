import React from "react";
import {useParams} from "react-router";

const NoRoute = () => {
  const param = useParams();
  return (
    <div className="flex gap-5 flex-col justify-center items-center my-20 p-5">
      <h1 className="text-3xl font-semibold">404 Page Not Found</h1>
      <div>
        "/{param.unknown}" The page you are looking for does not Exist, please enter the
        correct URL
      </div>
    </div>
  );
};

export default NoRoute;
