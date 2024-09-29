import SuikaLogo from "../../../assets/favicon.svg";
import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const FooterComponent = () => {
  return (
    <Footer container>
      <div className="w-full  mx-auto max-w-[76rem]">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="w-full sm:max-w-[20rem] mb-8 sm:mb-auto">
            <Footer.Brand
              href={"/"}
              src={SuikaLogo}
              alt="SuikaBot Logo"
              name={
                <p className="self-center font-bold whitespace-nowrap dark:text-white">
                  <span className="ml-2 text-3xl">
                    Suika<span style={{ color: "#1490D6" }}>Bot</span>
                  </span>
                </p>
              }
            />
            <p className="ml-1">
              SuikaBot adalah sebuah Bot yang berjalan pada WhatsApp dan bisa
              kamu gunakan fiturnya tanpa perlu persetujuan owner terlebih
              dahulu.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Konten" />
              <Footer.LinkGroup col>
                <Footer.Link href="#!">Utama</Footer.Link>
                <Footer.Link href="#!">Tentang</Footer.Link>
                <Footer.Link href="#!">Kata Mereka</Footer.Link>
                <Footer.Link href="#!">Leaderboard</Footer.Link>
                <Footer.Link href="#!">Nomor Bot</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#!">WhatsApp</Footer.Link>
                <Footer.Link href="#!">WhatsApp Channel</Footer.Link>
                <Footer.Link href="#!">Github</Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#!">Privacy Policy</Footer.Link>
                <Footer.Link href="#!">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div> */}
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#!" by="SuikaDev™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#!" icon={BsFacebook} />
            <Footer.Icon href="#!" icon={BsInstagram} />
            <Footer.Icon href="#!" icon={BsTwitter} />
            <Footer.Icon href="#!" icon={BsGithub} />
            <Footer.Icon href="#!" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
