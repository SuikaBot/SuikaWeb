import { useEffect, useRef, useState } from "react";
import { ENDPOINTS } from "../../../utils/contants/endpoint";
import axios from "axios";
import Bot from "../Bot/Bot";
import BotGo from "../BotGo/BotGo";
import { BoxLoading, BoxImgLoading } from "../../General/Loading";

const ListBot = () => {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSuikaBotList = async () => {
    try {
      const response = await axios.get(ENDPOINTS.BOTS);
      const data = response.data.data.suikaBotList;

      const sortedBots = data.sort((a, b) => {
        if (a.status === b.status) {
          return new Date(a.created_at) - new Date(b.created_at); // Urutkan berdasarkan created_at jika status sama
        }
        return a.status ? -1 : 1; // Aktif di atas
      });

      setBots(sortedBots);
    } catch (error) {
      ("");
    } finally {
      setLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState("tabs-with-card-1");
  const [hasInteracted, setHasInteracted] = useState(false);
  const tabRefs = useRef({});

  const handleTabClick = (tabId, event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    setActiveTab(tabId);
    setHasInteracted(true);

    if (tabRefs.current[tabId]) {
      tabRefs.current[tabId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    getSuikaBotList();
  }, []);

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
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-28 lg:py-14 mx-auto relative z-20 overflow-hidden before:absolute before:top-10 before:start-1/4 before:bg-bg1 before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="relative p-6 md:p-16">
          <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center">
            <div
              className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-7 lg:order-2"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              <h2 className="text-3xl text-gray-800 font-bold z-20">
                List Nomor Bot :
              </h2>
              <div className="text-lg">
                <p className="pt-5">
                  Pilih nomor SuikaBot yang sedang aktif, klik icon/gambarnya
                  dan kamu akan diarahkan ke nomor WhatsApp SuikaBot.
                </p>
                <p className="pt-3">
                  *Jangan lupa gunakan perintah
                  <span className="font-bold"> .menu</span> untuk melihat list
                  fitur yang tersedia pada bot.
                </p>
              </div>
              <nav
                className="grid gap-4 mt-5 md:mt-5"
                aria-label="Tabs"
                role="tablist"
              >
                {loading ? (
                  <>
                    <BoxLoading />
                    <BoxLoading />
                    <BoxLoading />
                  </>
                ) : (
                  bots.map((bot, index) => {
                    const tabId = `tabs-with-card-${index + 1}`;
                    return (
                      <Bot
                        key={index}
                        id={tabId}
                        active={activeTab === tabId}
                        name={`${index + 1}. ${bot.name} | ${
                          bot.status ? "Online" : "Offline"
                        }${
                          bot.reason &&
                          bot.reason !== "-" &&
                          !bot.reason.includes("Banned") &&
                          !bot.reason.includes("Backup")
                            ? `(${bot.reason})`
                            : ""
                        }`}
                        phone={bot.bot_id}
                        reason={bot.reason}
                        onClick={(e) => handleTabClick(tabId, e)}
                        status={bot.status}
                      />
                    );
                  })
                )}
              </nav>
            </div>

            <div
              className="lg:col-span-6"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              <div className="relative">
                {loading ? (
                  <BoxImgLoading status={loading} />
                ) : (
                  bots.map((bot, index) => {
                    const tabId = `tabs-with-card-${index + 1}`;
                    return (
                      <div
                        key={index}
                        id={tabId}
                        ref={(el) => (tabRefs.current[tabId] = el)}
                      >
                        <BotGo
                          id={tabId}
                          hidden={activeTab === tabId ? "block" : "hidden"}
                          linkActive={bot.status}
                          filter={bot.status ? "" : "grayscale"}
                          version={bot.version}
                          phone={bot.bot_id}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 grid grid-cols-12 size-full">
            <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-neutral-50 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListBot;
