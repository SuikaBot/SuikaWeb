import { Button, Modal } from "flowbite-react";

const ModalCore = ({
  title,
  btnTitle,
  formSubmit,
  children,
  openModal,
  actClose,
}) => {
  return (
    <>
      <Modal
        className="bg-black bg-opacity-60"
        show={openModal}
        position={"center"}
        onClose={() => actClose()}
      >
        <Modal.Header>{title}</Modal.Header>
        <form onSubmit={formSubmit}>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
            <Button className="bg-color3 text-white" type="submit">
              {btnTitle}
            </Button>
            <Button color="gray" onClick={() => actClose()}>
              Back
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* <div
        id={id}
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[70] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-10  hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
          <div className="relative flex flex-col shadow-md rounded-xl overflow-hidden dark:bg-color2 ">
            <div className="absolute top-2 m-3 end-2">
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-md font-semibold rounded-lg border border-transparent text-color4 disabled:opacity-50 disabled:pointer-events-none dark:text-color5 dark:border-transparent  dark:focus:outline-none "
                data-hs-overlay={`#${id}`}
              >
                <span className="sr-only">Close</span>
                <FontAwesomeIcon
                  className="flex-shrink-0 w-4 h-4"
                  icon="fa-solid fa-xmark"
                />
              </button>
            </div>

            <form onSubmit={formSubmit}>
              <div className="p-4 sm:p-10 overflow-y-auto">
                <div className="flex gap-x-4 md:gap-x-7">
                  <div className="grow">
                    <h3 className="mb-2 text-3xl font-bold text-gray-800 dark:text-gray-700">
                      {title}
                    </h3>
                    {children}
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t  dark:border-gray-300">
                <button
                  type="button"
                  className="py-2 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-zinc-200 dark:text-color4 dark:hover:bg-zinc-300 dark:focus:outline-none dark:focus:ring-1"
                  data-hs-overlay={`#${id}`}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="py-2 px-8 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-color3 text-white hover:bg-6hover disabled:opacity-50 disabled:pointer-events-none "
                >
                  {btnTitle}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ModalCore;
