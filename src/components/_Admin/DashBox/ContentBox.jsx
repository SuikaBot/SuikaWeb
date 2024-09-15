import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContentBox = ({
  small_name,
  name,
  icon,
  value,
  children,
  color_icon,
  hidden_icon,
}) => {
  return (
    <div className="p-4 md:p-5 min-h-[410px] flex flex-col bg-white border shadow-md hover:shadow-lg rounded-xl">
      {/* <!-- Header --> */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm text-gray-500">{small_name}</h2>
          <p className="text-xl sm:text-2xl font-medium text-color4">{name}</p>
        </div>

        <div>
          <span
            className={`py-[5px] px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-md ${color_icon} ${hidden_icon}`}
          >
            <FontAwesomeIcon className="inline-block size-3.5" icon={icon} />
            {value}
          </span>
        </div>
      </div>
      {/* <!-- End Header --> */}

      {/* Content */}
      <div>{children}</div>
      {/* End Content */}
    </div>
  );
};

export default ContentBox;
