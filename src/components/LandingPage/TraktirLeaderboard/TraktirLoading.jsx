import { Avatar } from "flowbite-react";
import { useState } from "react";
import { ManyTextLoading, TextLoading } from "../../General/Loading";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getPodiumStyle = (rank) => {
  switch (rank) {
    case 1:
      return {
        container: "h-28 sm:h-36 w-full sm:w-48 md:w-52",
        gradient: "from-emerald-400 to-green-500",
        fontSize: "text-4xl",
      };
    case 2:
      return {
        container: "h-20 md:h-28 w-full sm:w-48 md:w-52 mr-1",
        gradient: "from-emerald-300 to-green-400",
        fontSize: "text-3xl",
      };
    case 3:
      return {
        container: "h-16 sm:h-24 w-full sm:w-48 md:w-52",
        gradient: "from-emerald-300 to-green-400",
        fontSize: "text-2xl",
      };
    default:
      return {
        container: "h-16 w-full",
        gradient: "from-emerald-200 to-green-300",
        fontSize: "text-xl",
      };
  }
};

const LoadingContent = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleDetails = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <div className="relative flex justify-center items-end pb-6 py-8 space-x-1 text-center">
        {items.slice(0, 3).map((item, index) => {
          const podiumStyle = getPodiumStyle(item);
          return (
            <div
              key={index}
              className={`flex flex-col items-center z-10 ${
                item === 2 ? "order-1" : item === 1 ? "order-2" : "order-3"
              }`}
            >
              <div className="mb-2">
                <Avatar
                  placeholderInitials={`${item}${
                    item === 1 ? "st" : item === 2 ? "nd" : "rd"
                  }`}
                  rounded
                  bordered
                  color={"success"}
                  size={item === 1 ? "xl" : "lg"}
                />
              </div>
              <div className="text-color4 text-lg font-bold">
                <TextLoading h1={3} w1={6} h2={3} w2={10} />
              </div>
              <div className="text-color4 opacity-80 font-semibold text-md">
                <TextLoading h1={2} w1={12} hide2={"hidden"} />
              </div>
              <div className="text-green-700 opacity-65 font-normal text-sm">
                <TextLoading h1={2} w1={6} hide2={"hidden"} />
              </div>
              <div
                className={`bg-gradient-to-t ${podiumStyle.gradient} mt-2 ${podiumStyle.container} flex items-center justify-center text-white font-bold ${podiumStyle.fontSize} rounded-t-lg`}
              >
                {item}
                <span className="text-sm">
                  {item === 1 ? "st" : item === 2 ? "nd" : "rd"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard 4-10 */}
      <div className="bg-color1 p-3 sm:p-8 rounded-lg shadow-lg md:mx-20 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-10 gap-y-2">
          {items.slice(3).map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-green-50 p-4 rounded-lg shadow-lg"
            >
              <div
                id={`accordion-collapse-heading-${index}`}
                className="flex justify-between w-full cursor-pointer"
                onClick={() => toggleDetails(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`accordion-collapse-body-${index}`}
              >
                <div className="flex items-top space-x-4">
                  <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 border shadow-sm border-gray-400 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      {item}
                      <span className="text-xs">th</span>
                    </span>
                  </div>

                  <div>
                    <div className="text-color4 font-bold text-lg">
                      <TextLoading h1={4} w1={10} h2={4} w2={24} />
                    </div>
                    <div className="font-semibold">
                      <TextLoading h1={3} w1={14} h2={3} w2={10} />
                    </div>
                  </div>
                </div>
                <motion.div
                  className="flex items-center"
                  animate={{
                    scale: activeIndex === index ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <FontAwesomeIcon
                    className="transition ml-2 rounded-full bg-green-200 p-2 border border-green-300 text-color4 shadow-md"
                    icon={`chevron-${activeIndex === index ? "up" : "down"}`}
                  />
                </motion.div>
              </div>

              <motion.div
                id={`accordion-collapse-body-${index}`}
                aria-labelledby={`accordion-collapse-heading-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={
                  activeIndex === index
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-gray-400 rounded-lg mt-2 p-5">
                  <ManyTextLoading />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LoadingContent;
