import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CountUp from "react-countup";

const Stat = (props) => {
  return (
    <div className="z-1 p-4 md:p-5 relative before:absolute before:top-0 before:start-0 before:w-full before:h-px sm:before:w-px sm:before:h-full before:bg-gray-200 before:first:bg-transparent">
      <div>
        <FontAwesomeIcon className="text-gray-500" icon={props.mainIcon} />
        <div className="mt-3">
          <div className="flex items-center gap-x-2">
            <p className="text-xs uppercase tracking-wide text-gray-950">
              {props.title}
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
              {props.loading ? (
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
              ) : props.number ? (
                <>
                  <CountUp
                    start={0}
                    end={props.number}
                    duration={4}
                    // enableScrollSpy={true}
                  >
                    <span ref={props.number} />
                  </CountUp>
                  {props.additional}
                </>
              ) : (
                props.additional
              )}
            </h3>
            {/* <p className="mt-1 lg:mt-0 min-h-[24px] inline-flex items-center gap-x-1 py-0.5 px-2 text-orange-700 bg-orange-200/70 hover:bg-orange-200 rounded-md">
              <FontAwesomeIcon
                icon={
                  props.statusDataIcon
                    ? props.statusDataIcon
                    : "fa-solid fa-triangle-exclamation"
                }
              />
              <span className="inline-block text-xs font-semibold">
                {props.statusData ? props.statusData : "static data"}
              </span>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stat;
