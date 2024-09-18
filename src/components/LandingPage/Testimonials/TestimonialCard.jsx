import { BoxLoading } from "../../General/Loading";

const TestimonialCard = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <>
          <div className="px-2" data-aos="fade-left" data-aos-duration="500">
            <BoxLoading />
          </div>
        </>
      ) : (
        <div
          className="max-w-full px-2"
          data-aos="fade-left"
          data-aos-duration="500"
        >
          <figure className="flex flex-col items-center justify-center p-8 text-center bg-gradient-to-t from-emerald-100 to-green-500 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <blockquote className="max-w-2xl mx-auto text-neutral-50 dark:text-gray-400">
              {/* <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Very easy this was to integrate
              </h3> */}
              <p className="mb-4">
                {`"If you care for your time, I hands down would go with this."`}
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center ">
              <img
                className="rounded-full w-9 h-9"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                alt="profile picture"
              />
              <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                <div>Bonnie Green</div>
                <div className="text-sm text-gray-700 dark:text-gray-400">
                  Developer at Open AI
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
};

export default TestimonialCard;