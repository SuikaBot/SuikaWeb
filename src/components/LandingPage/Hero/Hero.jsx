import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

import Zoom from "react-medium-image-zoom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SuikaLogo from "../../../assets/favicon.svg";

const Hero = () => {
  return (
    <section id="home">
      <div className="relative z-20 overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          <div className="flex justify-center items-center">
            <Zoom>
              <img className="h-40 md:h-60" src={SuikaLogo} alt="" />
            </Zoom>
          </div>

          <div className="mt-5 max-w-xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
              Suika<span style={{ color: "#1490D6" }}>Bot</span>
            </h1>
          </div>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-700">
              Sebuah Bot dengan berbagai fitur berguna bagi kamu yang berjalan
              pada WhatsApp, ketik <span className="font-bold">.menu</span>{" "}
              untuk melihat list perintah bot.
            </p>
          </div>

          <div className="mt-8 gap-3 flex justify-center">
            <Link
              to={"list-bot"}
              smooth={true}
              duration={500}
              className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-emerald-600 to-green-500 hover:from-green-500 hover:to-emerald-600 border border-transparent text-white text-sm font-bold rounded-full py-3 px-4"
            >
              <FontAwesomeIcon icon="fa-solid fa-robot" />
              Cek Nomor Bot
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
