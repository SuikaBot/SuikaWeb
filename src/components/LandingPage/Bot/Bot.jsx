import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Bot = (props) => {
  const linkActive = props.linkActive ? props.linkActive : false;

  const colorBtn = linkActive ? "bg-color1" : "bg-red-200";
  const colorIcon = linkActive ? "text-green-600" : "text-red-600";

  return (
    <>
      <button
        type="button"
        className={`hs-tab-active:${colorBtn} hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start bg-gray-100 hover:${colorBtn} p-4 md:p-5 rounded-xl `}
        id={`tabs-with-card-item-${props.id}`}
        data-hs-tab={`#tabs-with-card-${props.id}`}
        aria-controls={`tabs-with-card-${props.id}`}
        role="tab"
      >
        <span className="flex">
          <FontAwesomeIcon
            className={`flex-shrink-0 mt-2 size-6 md:size-7 hs-tab-active:${colorIcon} text-gray-700`}
            icon={props.icon}
          />
          <span className="grow ms-6">
            <span className="block text-lg font-semibold hs-tab-active:text-black text-gray-700">
              {props.name}
            </span>
            <span className="block mt-1 text-gray-800">
              Nomor : {props.phone}
            </span>
          </span>
        </span>
      </button>
    </>
  );
};

export default Bot;
