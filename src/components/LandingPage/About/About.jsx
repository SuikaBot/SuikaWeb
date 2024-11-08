import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Zoom from "react-medium-image-zoom";

import AboutImg from "../../../assets/about-img.svg";
import Waves from "../../../assets/waves.svg";
import Waves2 from "../../../assets/waves2.svg";
import { useState } from "react";
import { BoxImgLoading } from "../../General/Loading";

const About = () => {
  const [loading, setLoading] = useState(true);
  const handleLoad = () => {
    setLoading(false);
  };
  return (
    <>
      <section id="about">
        <div className="bg-neutral-50 mt-16">
          <img src={Waves} alt="" className="w-full" />

          <div className="max-w-[70rem] px-8 py-10 sm:px-10 md:px-14 lg:px-8 lg:py-14 lg:mx-auto">
            <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
              <h2 className="md:hidden mb-5 font-bold text-3xl lg:text-4xl text-gray-800">
                Apa, SuikaBot?
              </h2>
              <div data-aos="fade-up" data-aos-duration="1200">
                {loading && <BoxImgLoading />}
                <Zoom>
                  <img
                    className={`rounded-xl ${loading ? "hidden" : "block"}`}
                    src={AboutImg}
                    onLoad={handleLoad}
                    alt="Image Description"
                  />
                </Zoom>
              </div>

              <div className="mt-5 sm:mt-10 lg:mt-0">
                <div className="space-y-6 sm:space-y-8">
                  <div
                    className="space-y-2 md:space-y-4"
                    data-aos="fade-up"
                    data-aos-duration="900"
                  >
                    <h2 className="hidden md:block font-bold text-3xl lg:text-4xl text-gray-800">
                      Apa, SuikaBot?
                    </h2>
                    <div className="text-gray-500 text-justify text-lg">
                      <p>
                        Iyaa betul!! <span className="font-bold">SuikaBot</span>{" "}
                        itu adalah sebuah Bot yang berjalan pada WhatsApp dan
                        bisa kamu gunakan fiturnya tanpa perlu persetujuan owner
                        terlebih dahulu. Menariknya, untuk saat ini kami masih
                        memberikan kebebasan pemakaian atau{" "}
                        <span className="italic">free-to-use</span> untuk kamu
                        gunakan baik secara personal maupun dalam grup.
                      </p>
                      <p className="pt-3">
                        Kami juga menyediakan sebuah{" "}
                        <span className="font-bold">Channel</span> di WhatsApp
                        agar kamu bisa melihat informasi seputar update bot dan
                        hal lain yang terkait.
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 sm:space-y-4 text-md">
                    <div data-aos="fade-up" data-aos-duration="900">
                      <li className="flex space-x-3">
                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                          <FontAwesomeIcon icon="fa-solid fa-check" />
                        </span>

                        <span className="text-gray-500">
                          <span className="font-bold">Fitur</span> nambah terus
                        </span>
                      </li>

                      <li className="flex space-x-3">
                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                          <FontAwesomeIcon icon="fa-solid fa-check" />
                        </span>

                        <span className="text-gray-500">
                          Tanpa{" "}
                          <span className="font-bold">Limit & Gratis</span>{" "}
                          <span className="italic">(untuk saat ini)</span>
                        </span>
                      </li>

                      <li className="flex space-x-3">
                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                          <FontAwesomeIcon icon="fa-solid fa-check" />
                        </span>

                        <span className=" text-gray-500">Channel Whatsapp</span>
                      </li>

                      <li className="flex space-x-3">
                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                          <FontAwesomeIcon icon="fa-solid fa-check" />
                        </span>

                        <span className=" text-gray-500">
                          <span className="font-bold">Mendengar</span> saran,
                          keluh kesah & masukan kamu
                        </span>
                      </li>
                    </div>

                    <li
                      className="flex space-x-3 pt-5"
                      data-aos="fade-up"
                      data-aos-duration="900"
                    >
                      <Link
                        to={
                          "https://www.whatsapp.com/channel/0029VaNiu6g3bbV7077Sb429"
                        }
                        target="_blank"
                        className="transition ease-in-out hover:-translate-y-1 hover:scale-200 duration-200 inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-emerald-600 to-green-500 hover:from-green-500 hover:to-emerald-600 border border-transparent text-white text-sm font-bold rounded-full py-3 px-4"
                      >
                        <FontAwesomeIcon icon="fa-brands fa-whatsapp" />
                        Cek WhatsApp Channel
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <img src={Waves2} alt="" className="rotate-180 w-full" />
        </div>
      </section>
    </>
  );
};

export default About;
