import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import SuikaLogo from "../../assets/favicon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
    <>
      <header className="flex flex-wrap md:justify-start md:flex-nowrap sticky top-0 z-50 w-full py-4">
        <nav
          className="relative max-w-[85rem] rounded-[36px] mx-3 py-1 px-7 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto w-full bg-white border border-gray-200 flex flex-wrap md:grid-cols-12 basis-full items-center "
          aria-label="Global"
        >
          <div className="md:col-span-3">
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="cursor-pointer flex items-center justify-between rounded-xl text-xl font-semibold focus:outline-none focus:opacity-80"
            >
              <img className="h-8" src={SuikaLogo} alt="" />
              <p className="ml-1">SuikaBot</p>
            </Link>
          </div>

          <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
            <NavLink
              to={"https://www.whatsapp.com/channel/0029VaNiu6g3bbV7077Sb429"}
              target="_blank"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-gradient-to-tl from-emerald-500 to-green-600 hover:from-green-600 hover:to-emerald-500 text-white transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
            >
              <FontAwesomeIcon icon="fa-brands fa-whatsapp" />
              Channel
            </NavLink>

            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <FontAwesomeIcon
                  className="hs-collapse-open:hidden flex-shrink-0 size-4"
                  icon="fa-solid fa-bars-staggered"
                />
                <FontAwesomeIcon
                  className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                  icon="fa-solid fa-x"
                />
              </button>
            </div>
          </div>

          <div
            id="navbar-collapse-with-animation"
            className="py-5 hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
          >
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
              <div>
                <Link
                  to="home"
                  smooth={true}
                  duration={500}
                  className="hover:cursor-pointer inline-block text-black hover:text-gray-600"
                >
                  Utama
                </Link>
              </div>
              <div>
                <Link
                  to="about"
                  smooth={true}
                  duration={500}
                  className="hover:cursor-pointer inline-block text-black hover:text-gray-600"
                >
                  Tentang
                </Link>
              </div>
              <div>
                <Link
                  to="list-bot"
                  smooth={true}
                  duration={500}
                  className="hover:cursor-pointer inline-block text-black hover:text-gray-600"
                >
                  Nomor Bot
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
