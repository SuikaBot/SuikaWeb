import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuikaIcon from "../../../assets/suika-icon.svg";

const ListBot = () => {
  const MySwal = withReactContent(Swal);
  const [activeTab, setActiveTab] = useState("tabs-with-card-1");
  const [hasInteracted, setHasInteracted] = useState(false);

  const tab1Ref = useRef(null);
  const tab2Ref = useRef(null);
  const tab3Ref = useRef(null);

  const handleTabClick = (tabId, tabRef, event) => {
    event.preventDefault();
    setActiveTab(tabId);
    setHasInteracted(true);
    if (tabRef.current) {
      tabRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleImageClick = (event) => {
    event.preventDefault();
    MySwal.fire({
      icon: "warning",
      title: "Gagal",
      text: "Nomor tidak aktif, coba nomor lain...",
      confirmButtonColor: "#dd8255",
    });
  };

  useEffect(() => {
    if (hasInteracted) {
      const element = document.getElementById(activeTab);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeTab, hasInteracted]);

  return (
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
                Pilih nomor SuikaBot yang sedang aktif, klik icon/gambarnya dan
                kamu akan diarahkan ke nomor WhatsApp SuikaBot.
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
                  className={`hs-tab-active:bg-red-200 hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start bg-gray-100 hover:bg-red-200 p-4 md:p-5 rounded-xl ${
                    activeTab === "tabs-with-card-1" ? "bg-red-200" : ""
                  }`}
                  onClick={(e) =>
                    handleTabClick("tabs-with-card-1", tab1Ref, e)
                  }
                  aria-controls="tabs-with-card-1"
                  role="tab"
                >
                  <span className="flex">
                    <FontAwesomeIcon
                      className="flex-shrink-0 mt-2 size-6 md:size-7 text-gray-700"
                      icon="fa-solid fa-ban"
                    />
                    <span className="grow ms-6">
                      <span className="block text-lg font-semibold text-gray-700">
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
                  className={`hs-tab-active:bg-red-200 hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start bg-gray-100 hover:bg-red-200 p-4 md:p-5 rounded-xl ${
                    activeTab === "tabs-with-card-2" ? "bg-red-200" : ""
                  }`}
                  onClick={(e) =>
                    handleTabClick("tabs-with-card-2", tab2Ref, e)
                  }
                  aria-controls="tabs-with-card-2"
                  role="tab"
                >
                  <span className="flex">
                    <FontAwesomeIcon
                      className="flex-shrink-0 mt-2 size-6 md:size-7 text-gray-700"
                      icon="fa-solid fa-ban"
                    />
                    <span className="grow ms-6">
                      <span className="block text-lg font-semibold text-gray-700">
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
                  className={`hs-tab-active:bg-orange-200 hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start bg-gray-100 hover:bg-orange-200 p-4 md:p-5 rounded-xl ${
                    activeTab === "tabs-with-card-3" ? "bg-orange-200" : ""
                  }`}
                  onClick={(e) =>
                    handleTabClick("tabs-with-card-3", tab3Ref, e)
                  }
                  aria-controls="tabs-with-card-3"
                  role="tab"
                >
                  <span className="flex">
                    <FontAwesomeIcon
                      className="flex-shrink-0 mt-2 size-6 md:size-7 text-gray-700"
                      icon="fa-solid fa-clock-rotate-left"
                    />
                    <span className="grow ms-6">
                      <span className="block text-lg font-semibold text-gray-700">
                        3. SuikaBot | -
                      </span>
                      <span className="block mt-1 text-gray-800">
                        Nomor : -
                      </span>
                    </span>
                  </span>
                </button>
              </nav>
            </div>

            <div
              className="lg:col-span-6"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              <div className="relative">
                <div
                  id="tabs-with-card-1"
                  role="tabpanel"
                  className={`tabpanel ${
                    activeTab === "tabs-with-card-1" ? "block" : "hidden"
                  }`}
                  aria-labelledby="tabs-with-card-1"
                  ref={tab1Ref}
                >
                  <Link onClick={handleImageClick}>
                    <div className="shadow-xl shadow-gray-200 rounded-xl grayscale">
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
                  id="tabs-with-card-2"
                  role="tabpanel"
                  className={`tabpanel ${
                    activeTab === "tabs-with-card-2" ? "block" : "hidden"
                  }`}
                  aria-labelledby="tabs-with-card-2"
                  ref={tab2Ref}
                >
                  <Link onClick={handleImageClick}>
                    <div className="shadow-xl shadow-gray-200 rounded-xl grayscale">
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
                            current version: 1.7-Beta
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
                  id="tabs-with-card-3"
                  role="tabpanel"
                  className={`tabpanel ${
                    activeTab === "tabs-with-card-3" ? "block" : "hidden"
                  }`}
                  aria-labelledby="tabs-with-card-3"
                  ref={tab3Ref}
                >
                  <Link onClick={handleImageClick}>
                    <div className="shadow-xl shadow-gray-200 rounded-xl grayscale">
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
                            current version: 1.8-Beta
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
              </div>
            </div>
          </div>
          <div className="absolute inset-0 grid grid-cols-12 size-full">
            <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-white w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full"></div>
          </div>
        </div>
      </div>

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
      />

      <BotGo id="1" hidden="hidden" filter="grayscale" version="1.6-Beta" />

      <BotGo id="2" version="1.6" linkActive={true} />

      <BotGo id="3" hidden="hidden" filter="grayscale" version="-" /> */}
    </section>
  );
};

export default ListBot;
