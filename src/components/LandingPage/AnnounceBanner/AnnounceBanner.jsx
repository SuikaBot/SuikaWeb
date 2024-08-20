import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AnnounceBanner = () => {
  return (
    <>
      <div
        id="ab-full-width-with-dismiss-button-on-blue-bg"
        className="fixed bottom-0 left-0 right-0 hs-removing:-translate-y-full bg-color3 z-50"
      >
        <div className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex">
            <p className="text-white">
              <FontAwesomeIcon icon="fa-solid fa-helmet-safety" /> Website still
              under progress . . .
            </p>

            <div className="ps-3 ms-auto">
              <button
                type="button"
                className="inline-flex rounded-lg p-1.5 text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
                data-hs-remove-element="#ab-full-width-with-dismiss-button-on-blue-bg"
              >
                <span className="sr-only">Dismiss</span>
                <FontAwesomeIcon icon="fa-solid fa-x" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnounceBanner;
