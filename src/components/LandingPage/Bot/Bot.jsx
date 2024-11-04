import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

const formatString = (text) => {
  const regex = /^(.{5})(.*)(.{3})$/;
  if (text.length >= 8) {
    return text.replace(regex, (match, p1, p2, p3) => {
      return p1 + "*".repeat(p2.length) + p3;
    });
  } else {
    return text;
  }
};

const Bot = ({ id, active, reason, name, phone, onClick, status }) => {
  const getColorAndIcon = () => {
    if (reason === "Banned") {
      return {
        hover: "bg-red-200",
        color: "bg-red-300",
        text: "text-red-600",
        icon: "fa-solid fa-ban",
      };
    } else if (reason === "Backup") {
      return {
        hover: "bg-yellow-200",
        color: "bg-amber-200",
        text: "text-amber-700",
        icon: "fa-solid fa-copy",
      };
    } else if (reason === null || (reason === "-" && status === true)) {
      return {
        hover: "bg-green-200",
        color: "bg-green-300",
        text: "text-green-600",
        icon: "fa-solid fa-circle-check",
      };
    } else {
      return {
        hover: "bg-red-200",
        color: "bg-red-300",
        text: "text-red-600",
        icon: "fa-solid fa-ban",
      };
    }
  };

  const { hover, color, text, icon } = getColorAndIcon();

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      key={id}
      type="button"
      className={`border transition active:shadow-md hover:shadow-md active:hover:border-transparent text-start hover:${hover} p-4 md:p-5 rounded-xl text-gray-600 ${
        active ? `${color}` : "bg-gray-200"
      }`}
      onClick={onClick}
      aria-controls={id}
      role="tab"
    >
      <span className="flex">
        <FontAwesomeIcon
          className={`flex-shrink-0 mt-2 size-6 md:size-7 ${
            active ? `${text}` : ""
          }`}
          icon={icon}
        />
        <span className="grow ms-6">
          <span className="block text-lg font-semibold text-gray-700">
            {name}
          </span>
          <span className="block mt-1 text-gray-800">
            {formatString(phone)}
          </span>
        </span>
      </span>
    </motion.button>
  );
};

export default Bot;
