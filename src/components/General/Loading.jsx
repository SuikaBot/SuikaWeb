import { motion } from "framer-motion";

const LoadingSpinner = ({ size, color, name }) => {
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

const BoxLoading = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className="border transition active:shadow-md hover:shadow-md active:hover:border-transparent text-start p-4 md:p-5 rounded-xl text-gray-600 bg-neutral-50"
    >
      <span className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-400 h-10 w-10"></div>
        <span className="grow ms-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-5 bg-slate-400 rounded col-span-2"></div>
          </div>
          <span className="block mt-3 text-gray-800">
            <div className="h-3 bg-slate-400 rounded"></div>
          </span>
        </span>
      </span>
    </motion.div>
  );
};

const BoxImgLoading = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-200 max-w-full p-4 border border-gray-200 rounded shadow md:p-6"
    >
      <div className="animate-pulse">
        <div className="flex items-center justify-center h-48 mb-4 bg-gray-400 rounded dark:bg-gray-700">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          </svg>
        </div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-slate-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-slate-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-slate-400 rounded-full dark:bg-gray-700"></div>
        {/* <div className="flex items-center mt-4">
        <svg
          className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
          <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div> */}
        <span className="sr-only">Loading...</span>
      </div>
    </motion.div>
  );
};

const ImgLoading = ({ type, w, h }) => {
  return (
    <svg
      className={`animate-pulse w-${w} h-${h} text-gray-200 dark:text-gray-600 ${type}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 18"
    >
      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
    </svg>
  );
};

const TextLoading = ({ h1, h2, w1, w2, styles, hide1, hide2 }) => {
  return (
    <>
      <span className="animate-pulse flex space-x-1 my-1">
        <div
          className={`h-${h1} bg-gray-400 ${hide1} rounded-full dark:bg-gray-700 w-${w1} ${styles}`}
        ></div>
        <div
          className={` h-${h2} bg-gray-400 ${hide2} rounded-full dark:bg-gray-700 w-${w2} ${styles}`}
        ></div>
      </span>
    </>
  );
};

const ManyTextLoading = () => {
  return (
    <div className="max-w-sm animate-pulse">
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const ListLoading = () => {
  return (
    <div className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export {
  LoadingSpinner,
  BoxLoading,
  BoxImgLoading,
  ImgLoading,
  TextLoading,
  ManyTextLoading,
  ListLoading,
};
