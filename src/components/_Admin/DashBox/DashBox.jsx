import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashBox = ({
  name,
  hidden,
  tooltip,
  value,
  percentage,
  color_icon,
  hidden_icon,
  icon,
}) => {
  return (
    <>
      <div className="flex flex-col bg-white border shadow-md hover:shadow-lg rounded-xl dark:border-neutral-200">
        <div className="p-4 md:p-5">
          <div className="flex items-center gap-x-2">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              {name}
            </p>
            <div className="hs-tooltip">
              <div className={`hs-tooltip-toggle ${hidden}`}>
                <FontAwesomeIcon icon="fa-regular fa-circle-question" />
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                  role="tooltip"
                >
                  {tooltip}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl sm:text-2xl font-medium text-color4 ">
              {value}
            </h3>
            <span
              className={`flex items-center gap-x-1 ${color_icon} ${hidden_icon}`}
            >
              {hidden_icon != "hidden" ? (
                <FontAwesomeIcon
                  className="inline-block size-4 self-center"
                  icon={icon}
                />
              ) : (
                ""
              )}
              <span className="inline-block text-sm">{percentage}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBox;
