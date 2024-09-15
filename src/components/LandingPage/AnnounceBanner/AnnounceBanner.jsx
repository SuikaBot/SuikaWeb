import { Toast, ToastToggle } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const AnnounceBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-5 md:bottom-10 left-10 right-10 z-50 announce-banner-enter">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-200 text-yellow-500 dark:bg-cyan-800 dark:text-cyan-200">
              <FontAwesomeIcon
                className="h-5 w-5"
                icon="fa-solid fa-helmet-safety"
              />
            </div>
            <div className="ml-3 text-sm font-normal">
              Website still under progress . . .
            </div>
            <ToastToggle />
          </Toast>
        </div>
      )}
    </>
  );
};

export default AnnounceBanner;
