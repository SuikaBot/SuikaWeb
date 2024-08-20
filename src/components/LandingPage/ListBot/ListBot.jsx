import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SuikaIcon from "../../../assets/suika-icon.svg";

// import Bot from "../Bot/Bot";
// import BotGo from "../BotGo/BotGo";

const ListBot = () => {
  const MySwal = withReactContent(Swal);

  const handleClick = (event) => {
    MySwal.fire({
      icon: "warning",
      title: "Gagal",
      text: "Nomor tidak aktif, coba nomor lain...",
    });
    event.preventDefault();
  };
  return (
    <>
      <section id="list-bot">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-28 lg:py-14 mx-auto">
          <div className="relative p-6 md:p-16">
            <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center">
              <div
                className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-7 lg:order-2"
                data-aos="fade-up"
                data-aos-duration="900"
              >
                <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl z-20">
                  List Nomor Bot :
                </h2>

                <p className="pt-5">
                  Pilih nomor SuikaBot yang sedang aktif, klik icon/gambarnya
                  dan kamu akan diarahkan ke nomor WhatsApp SuikaBot.
                </p>
                <p className="pt-3">
                  *Jangan lupa gunakan perintah
                  <span className="font-bold"> .menu</span> untuk melihat list
                  fitur yang tersedia pada bot.
                </p>

                <nav
                  className="grid gap-4 mt-5 md:mt-10"
                  aria-label="Tabs"
                  role="tablist"
                >
                  <button
                    type="button"
                    className={`hs-tab-active:bg-red-200 hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start bg-gray-100 hover:bg-red-200 p-4 md:p-5 rounded-xl `}
                    id={`tabs-with-card-item-1`}
                    data-hs-tab={`#tabs-with-card-1`}
                    aria-controls={`tabs-with-card-1`}
                    role="tab"
                  >
                    <span className="flex">
                      <FontAwesomeIcon
                        className={`flex-shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-red-600 text-gray-700`}
                        icon="fa-solid fa-ban"
                      />
                      <span className="grow ms-6">
                        <span className="block text-lg font-semibold hs-tab-active:text-black text-gray-700">
                          1. SuikaBot | Offline (Ban)
                        </span>
                        <span className="block mt-1 text-gray-800">
                          Nomor : +62***0233
                        </span>
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`hs-tab-active:bg-red-200 hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start bg-gray-100 hover:bg-red-200 p-4 md:p-5 rounded-xl active`}
                    id={`tabs-with-card-item-2`}
                    data-hs-tab={`#tabs-with-card-2`}
                    aria-controls={`tabs-with-card-2`}
                    role="tab"
                  >
                    <span className="flex">
                      <FontAwesomeIcon
                        className={`flex-shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-red-600 text-gray-700`}
                        icon="fa-solid fa-ban"
                      />
                      <span className="grow ms-6">
                        <span className="block text-lg font-semibold hs-tab-active:text-black text-gray-700">
                          2. SuikaBot | Offline (Ban)
                        </span>
                        <span className="block mt-1 text-gray-800">
                          Nomor : +62***2089
                        </span>
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`hs-tab-active:bg-orange-200 hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start bg-gray-100 hover:bg-orange-200 p-4 md:p-5 rounded-xl `}
                    id={`tabs-with-card-item-3`}
                    data-hs-tab={`#tabs-with-card-3`}
                    aria-controls={`tabs-with-card-3`}
                    role="tab"
                  >
                    <span className="flex">
                      <FontAwesomeIcon
                        className={`flex-shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-orange-600 text-gray-700`}
                        icon="fa-solid fa-clock-rotate-left"
                      />
                      <span className="grow ms-6">
                        <span className="block text-lg font-semibold hs-tab-active:text-black text-gray-700">
                          3. SuikaBot | -
                        </span>
                        <span className="block mt-1 text-gray-800">
                          Nomor : -
                        </span>
                      </span>
                    </span>
                  </button>
                  {/* <Bot
                    id="1"
                    icon="fa-solid fa-ban"
                    name="1. SuikaBot | Offline (Ban)"
                    phone="+62***0233"
                  />

                  <Bot
                    id="2"
                    active="active"
                    linkActive={true}
                    icon="fa-regular fa-circle-check"
                    name="2. SuikaBot | Online"
                    phone="+62***2089"
                  />

                  <Bot
                    id="3"
                    icon="fa-solid fa-clock-rotate-left"
                    name="3. SuikaBot | -"
                    phone="-"
                  /> */}
                </nav>
              </div>

              <div
                className="lg:col-span-6"
                data-aos="fade-up"
                data-aos-duration="900"
              >
                <div className="relative">
                  <div>
                    <div
                      id={`tabs-with-card-1`}
                      role="tabpanel"
                      className="hidden"
                      aria-labelledby={`tabs-with-card-item-1`}
                    >
                      <Link onClick={handleClick}>
                        <div
                          className={`shadow-xl shadow-gray-200 rounded-xl grayscale`}
                        >
                          <div className="bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-100 dark:border-neutral-100 dark:shadow-neutral-800/50">
                            <div className="h-full ra flex flex-col justify-center items-center bg-color2 rounded-t-xl">
                              <img
                                className="rounded-t-xl"
                                src={SuikaIcon}
                                alt=""
                              />
                            </div>
                            <div className="p-4 md:p-6">
                              <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
                                current version: 1.6-Beta
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

                    <div
                      id={`tabs-with-card-2`}
                      role="tabpanel"
                      aria-labelledby={`tabs-with-card-item-2`}
                    >
                      <Link onClick={handleClick}>
                        <div
                          className={`shadow-xl shadow-gray-200 rounded-xl grayscale`}
                        >
                          <div className="bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-100 dark:border-neutral-100 dark:shadow-neutral-800/50">
                            <div className="h-full ra flex flex-col justify-center items-center bg-color2 rounded-t-xl">
                              <img
                                className="rounded-t-xl"
                                src={SuikaIcon}
                                alt=""
                              />
                            </div>
                            <div className="p-4 md:p-6">
                              <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
                                current version: 1.6
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

                    <div
                      id={`tabs-with-card-3`}
                      role="tabpanel"
                      className="hidden"
                      aria-labelledby={`tabs-with-card-item-3`}
                    >
                      <Link onClick={handleClick}>
                        <div
                          className={`shadow-xl shadow-gray-200 rounded-xl grayscale`}
                        >
                          <div className="bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-100 dark:border-neutral-100 dark:shadow-neutral-800/50">
                            <div className="h-full ra flex flex-col justify-center items-center bg-color2 rounded-t-xl">
                              <img
                                className="rounded-t-xl"
                                src={SuikaIcon}
                                alt=""
                              />
                            </div>
                            <div className="p-4 md:p-6">
                              <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
                                current version: -
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
                    {/* <BotGo
                      id="1"
                      hidden="hidden"
                      filter="grayscale"
                      version="1.6-Beta"
                    />

                    <BotGo id="2" version="1.6" linkActive={true} />

                    <BotGo
                      id="3"
                      hidden="hidden"
                      filter="grayscale"
                      version="-"
                    /> */}
                  </div>

                  <div className="z-10 hidden absolute top-0 end-0 translate-x-20 md:block lg:translate-x-20">
                    <svg
                      className="w-16 h-auto text-orange-500"
                      width="121"
                      height="135"
                      viewBox="0 0 121 135"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                      />
                      <path
                        d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                      />
                      <path
                        d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 grid grid-cols-12 size-full">
              <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-white w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListBot;
