import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <>
      <footer className="bottom-0 left-0 w-full border-t-2 lg:ps-[260px] border-gray-100 mt-auto py-3 bg-white text-center">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </footer>
    </>
  );
};

export default Footer;
