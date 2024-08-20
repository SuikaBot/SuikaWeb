import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuikaIcon from "../../assets/suika-icon.svg";

const BotGo = (props) => {
  const MySwal = withReactContent(Swal);

  const handleClick = (event) => {
    MySwal.fire({
      icon: "warning",
      title: "Gagal",
      text: "Nomor tidak aktif, coba nomor lain...",
    });
    event.preventDefault();
  };

  const linkActive = props.linkActive ? props.linkActive : false;
  const to = linkActive
    ? "https://api.whatsapp.com/send/?phone=6285179910233&text=p&type=phone_number&app_absent=0"
    : "";
  const target = linkActive ? "_blank" : "";

  return (
    <div
      id={`tabs-with-card-${props.id}`}
      role="tabpanel"
      className={props.hidden}
      aria-labelledby={`tabs-with-card-item-${props.id}`}
    >
      <Link
        to={to}
        target={target}
        onClick={!linkActive ? handleClick : undefined}
      >
        <div className={`shadow-xl shadow-gray-200 rounded-xl ${props.filter}`}>
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-100 dark:border-neutral-100 dark:shadow-neutral-800/50">
            <div className="h-full ra flex flex-col justify-center items-center bg-color2 rounded-t-xl">
              <img className="rounded-t-xl" src={SuikaIcon} alt="" />
            </div>
            <div className="p-4 md:p-6">
              <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
                current version: {props.version}
              </span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-800 ">
                SuikaBot
              </h3>
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:divide-neutral-700">
              <div className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-tl from-emerald-500 to-green-600 hover:from-green-600 hover:to-emerald-500 text-white transition">
                <FontAwesomeIcon icon="fa-brands fa-whatsapp" />
                Mulai Chat
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BotGo;
