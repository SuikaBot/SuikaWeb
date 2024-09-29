import { useState } from "react";
import SuikaIcon from "../../../assets/suika-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Waves from "../../../assets/waves.svg";
import Waves2 from "../../../assets/waves2.svg";
import { motion } from "framer-motion";
import LoadingContent from "./TraktirLoading";

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

const TraktirLeaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDetails = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section id="traktir-leaderboard">
      <div className="bg-neutral-50">
        <img src={Waves} alt="" className="w-full" />
        <div className="max-w-5xl mx-auto px-4 py-5">
          {/* Header */}
          <div className="text-center">
            <h2 className="font-bold text-3xl lg:text-4xl text-gray-800">
              Leaderboard
            </h2>
            <p className="text-lg mt-1 text-gray-400">
              Top-10 Traktir SuikaBot
            </p>
          </div>

          {loading ? (
            <LoadingContent />
          ) : (
            <>
              {/* Podium with Merged Background */}
              <div className="relative flex justify-center items-end pb-6 py-8 space-x-1 text-center">
                {leaderboardData.slice(0, 3).map((user) => {
                  const podiumStyle = getPodiumStyle(user.rank);

                  return (
                    <div
                      key={user.name}
                      className={`flex flex-col items-center z-10 ${
                        user.rank === 2
                          ? "order-1"
                          : user.rank === 1
                          ? "order-2"
                          : "order-3"
                      }`}
                    >
                      <img
                        className={`rounded-full ${
                          user.rank === 1 ? "w-32" : "w-20"
                        } border-2 border-green-500 p-1`}
                        src={user.img}
                        alt="Avatar"
                      />
                      <p className="text-color4 text-lg font-bold">
                        {user.name}
                      </p>
                      <div className="bg-green-200 rounded-xl px-3 py-0.5">
                        <p className="text-color4 opacity-80 font-semibold text-md">
                          <span className="mr-1">Rp.</span>
                          {user.amount.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <p className="text-green-700 opacity-65 font-normal text-sm">
                        {user.donations}x Traktir
                      </p>
                      <div
                        className={`bg-gradient-to-t ${podiumStyle.gradient} mt-2 ${podiumStyle.container} flex items-center justify-center text-white font-bold ${podiumStyle.fontSize} rounded-t-lg`}
                      >
                        {user.rank}
                        <span className="text-sm">
                          {user.rank === 1
                            ? "st"
                            : user.rank === 2
                            ? "nd"
                            : "rd"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Leaderboard 4-10 */}
              <div className="bg-color1 p-3 sm:p-8 rounded-lg shadow-lg md:mx-20 md:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-10 gap-y-2">
                  {leaderboardData.slice(3).map((user, index) => (
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
                        {/* Left Section - Rank and Avatar and Details */}
                        <div className="flex items-top space-x-4">
                          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 border shadow-sm border-gray-400 rounded-full dark:bg-gray-600">
                            <span className="font-medium text-gray-600 dark:text-gray-300">
                              {user.rank}
                              <span className="text-xs">th</span>
                            </span>
                          </div>

                          <div>
                            <p className="text-color4 font-bold text-lg">
                              {user.name}
                            </p>
                            <p className="font-semibold">
                              Total: Rp. {user.amount.toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>

                        {/* Right Section - View Details Button */}
                        <motion.div
                          className="flex items-center"
                          animate={{
                            scale: activeIndex === index ? 1.2 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <FontAwesomeIcon
                            className="transition ml-2 rounded-full bg-color2 p-2 text-color4 shadow-md"
                            icon={`chevron-${
                              activeIndex === index ? "up" : "down"
                            }`}
                          />
                        </motion.div>
                      </div>

                      {/* Bottom Section - Details */}
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
                        <div className="bg-white border border-gray-400 rounded-lg mt-2 p-2">
                          <ol className="list-decimal text-gray-600 pl-4">
                            <li>
                              Traktir ke-1
                              <ol className="pl-4 list-disc">
                                <li>Tanggal: </li>
                                <li>Nama: </li>
                                <li>Nominal: </li>
                              </ol>
                            </li>
                          </ol>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <img src={Waves2} className="rotate-180 w-full" alt="" />
      </div>
    </section>
  );
};

export default TraktirLeaderboard;
