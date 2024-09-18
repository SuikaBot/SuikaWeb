import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CountUp from "react-countup";

const Stat = ({ mainIcon, title, loading, number, additional }) => {
  console.log(number);
  return (
    <div className="z-1 p-4 md:p-5 relative before:absolute before:top-0 before:start-0 before:w-full before:h-px sm:before:w-px sm:before:h-full before:bg-gray-200 before:first:bg-transparent">
      <div className="">
        <FontAwesomeIcon
          className="text-gray-500 hidden sm:block"
          icon={mainIcon}
        />
        <div className="mt-3">
          <div className="flex items-center gap-x-2">
            <p className="text-md sm:text-xs uppercase tracking-wide text-gray-950">
              <FontAwesomeIcon
                className="text-gray-500 sm:hidden"
                icon={mainIcon}
              />
              <span className="ml-2 sm:ml-auto">{title}</span>
            </p>
            {/* <div className="hs-tooltip">
              <div className="hs-tooltip-toggle">
                <FontAwesomeIcon
                  className="text-gray-500"
                  icon="fa-regular fa-circle-question"
                />
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                  role="tooltip"
                >
                  Total chat dari keseluruhan personal chat.
                </span>
              </div>
            </div> */}
          </div>
          <div className="mt-1 lg:flex lg:justify-between lg:items-center">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {loading ? (
                <>
                  <div className="flex justify-start animate-pulse">
                    <div
                      className="animate-spin my-1 inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                    <h6 className="text-md ml-4">Loading...</h6>
                  </div>
                </>
              ) : number >= 0 ? (
                <>
                  <CountUp
                    start={0}
                    end={number}
                    duration={4}
                    // enableScrollSpy={true}
                  >
                    <span ref={number} />
                  </CountUp>
                  {additional}
                </>
              ) : (
                additional
              )}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stat;
