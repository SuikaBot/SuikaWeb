import React from "react";

const Loading = ({ size, color, name }) => {
  return (
    <>
      <div
        className={`ml-1 animate-spin inline-block size-${
          size ? size : "6"
        } border-[3px] border-current border-t-transparent ${color} rounded-full`}
        role="status"
        aria-label={name}
      ></div>
      {/* <span className="text-md ml-2 animate-pulse">{name}</span> */}
    </>
  );
};

export default Loading;
