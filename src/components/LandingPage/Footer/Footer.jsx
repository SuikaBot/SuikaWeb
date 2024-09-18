import SuikaLogo from "../../../assets/favicon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-neutral-100 to-stone-200 shadow-inner">
        <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center">
            <div className="mx-auto text-3xl font-semibold">
              <img className="h-16 mx-auto" src={SuikaLogo} alt="" />

              <p className="">SuikaBot</p>
            </div>

            <div className="mt-3">
              <p className="text-gray-500">
                Build with{" "}
                <span className="text-red-500">
                  <FontAwesomeIcon icon="fa-solid fa-heart" />
                </span>{" "}
                &{" "}
                <span className="text-stone-600">
                  <FontAwesomeIcon icon="fa-solid fa-mug-hot" />
                </span>
              </p>
              {/* <p className="text-gray-500">
                Powered by ReactJS, ExpressJS &{" "}
                <Link
                  className="text-blue-600 underline"
                  to={"https://preline.co/"}
                  target="_blank"
                >
                  Preline UI
                </Link>
                .
              </p> */}
            </div>
            <div className="mt-3 space-x-2">
              <p className="text-gray-500">
                © SuikaBot. 2024 . All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default Footer;
