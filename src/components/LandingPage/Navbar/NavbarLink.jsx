import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SuikaLogo from "../../../assets/favicon.svg";
import { homeNav } from "../../../utils/contants/navigation";

const Navbar404 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="flex flex-wrap md:justify-start md:flex-nowrap sticky top-0 z-50 w-full py-4">
        <nav className="bg-gradient-to-b from-color1 to-color1-dark sm:px-5 md:px-10 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link
              to="/"
              className="cursor-pointer flex items-center justify-between rounded-xl text-xl font-semibold focus:outline-none focus:opacity-80"
            >
              <img src={SuikaLogo} className="h-8" alt="Flowbite Logo" />
              <p className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
                <span className="ml-2">
                  Suika<span style={{ color: "#1490D6" }}>Bot</span>
                </span>
              </p>
            </Link>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <NavLink
                to={"https://www.whatsapp.com/channel/0029VaNiu6g3bbV7077Sb429"}
                target="_blank"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-gradient-to-tl from-emerald-600 to-green-500 hover:from-green-500 hover:to-emerald-600 text-white transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
              >
                <FontAwesomeIcon icon="fa-brands fa-whatsapp" />
                Channel
              </NavLink>
              <button
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden bg-gray-100 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded={isOpen}
                onClick={toggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <FontAwesomeIcon className="hw-5 h-5" icon="fa-solid fa-x" />
                ) : (
                  <FontAwesomeIcon
                    className="w-5 h-5"
                    icon="fa-solid fa-bars-staggered"
                  />
                )}
              </button>
            </div>
            <div
              className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
                isOpen ? "block" : "hidden"
              }`}
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border bg-neutral-50 md:bg-transparent border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:dark:bg-gray-900 dark:border-gray-700">
                {homeNav.map((nav, index) => (
                  <li
                    key={index}
                    className="bg-neutral-100 sm:bg-transparent my-1 shadow-sm sm:shadow-none"
                  >
                    <Link
                      to={"/"}
                      smooth={true}
                      spy={true}
                      duration={500}
                      className="hover:cursor-pointer text-gray-500 hover:text-gray-800 hover:border-b hover:border-gray-800 transition text-semibold duration-150 hover:bg-color1 sm:hover:bg-transparent  block py-2 px-3 rounded md:p-0"
                    >
                      {nav.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar404;
