import Slider from "react-slick";
import { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { HR } from "flowbite-react";

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  const feedbacks = [
    { name: "John Doe", message: "Great experience!", group: "Group A" },
    {
      name: "Jane Smith",
      message: "Very helpful, thank you!",
      group: "Group B",
    },
    {
      name: "Sam Wilson",
      message: "Awesome service, will come back again!",
      group: null,
    },
    {
      name: "Chris Evans",
      message: "The team was fantastic!",
      group: "Group C",
    },
    {
      name: "Robert Downey",
      message: "Couldn’t have asked for better support.",
      group: "Group D",
    },
    {
      name: "Scarlett Johansson",
      message: "I felt very welcomed!",
      group: null,
    },
    {
      name: "Tom Holland",
      message: "Super fun and engaging.",
      group: "Group E",
    },
    {
      name: "Benedict Cumberbatch",
      message: "Highly recommended!",
      group: "Group F",
    },
    { name: "Mark Ruffalo", message: "Had an amazing time!", group: "Group G" },
    {
      name: "Jeremy Renner",
      message: "Definitely would come back!",
      group: null,
    },
    {
      name: "Brie Larson",
      message: "Fantastic environment!",
      group: "Group H",
    },
    { name: "Paul Rudd", message: "Best experience ever!", group: "Group I" },
    {
      name: "Chris Hemsworth",
      message: "Wonderful hospitality!",
      group: "Group J",
    },
    {
      name: "Elizabeth Olsen",
      message: "Couldn’t be happier!",
      group: "Group K",
    },
    { name: "Sebastian Stan", message: "Highly recommended!", group: null },
    { name: "Anthony Mackie", message: "Amazing!", group: "Group L" },
    {
      name: "Chadwick Boseman",
      message: "What a wonderful time!",
      group: "Group M",
    },
    {
      name: "Letitia Wright",
      message: "I had a great time!",
      group: "Group N",
    },
    {
      name: "Danai Gurira",
      message: "So friendly and helpful!",
      group: "Group O",
    },
    {
      name: "Winston Duke",
      message: "Would love to come again.",
      group: "Group P",
    },
    {
      name: "Lupita Nyong’o",
      message: "An unforgettable experience.",
      group: "Group Q",
    },
    { name: "Josh Brolin", message: "Exceeded expectations!", group: null },
    { name: "Tom Hiddleston", message: "A magical time.", group: "Group R" },
    { name: "Chris Pratt", message: "Will visit again!", group: "Group S" },
    { name: "Zoe Saldana", message: "Truly the best.", group: "Group T" },
    { name: "Vin Diesel", message: "Absolutely wonderful.", group: null },
    {
      name: "Dave Bautista",
      message: "A beautiful experience.",
      group: "Group U",
    },
    {
      name: "Karen Gillan",
      message: "Everything was perfect!",
      group: "Group V",
    },
    { name: "Pom Klementieff", message: "Best ever!", group: "Group W" },
    {
      name: "Bradley Cooper",
      message: "Can’t wait to come back.",
      group: "Group X",
    },
    { name: "Michael B. Jordan", message: "Incredible!", group: "Group Y" },
    { name: "Tessa Thompson", message: "So good!", group: "Group Z" },
    { name: "Jared Leto", message: "Amazing service!", group: null },
    { name: "Margot Robbie", message: "Love it!", group: "Group AA" },
    { name: "Gal Gadot", message: "Fabulous time!", group: "Group BB" },
  ];

  // Slice feedbacks into chunks of 10 per swiper
  const getFeedbackChunks = (feedbacks, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < feedbacks.length; i += chunkSize) {
      chunks.push(feedbacks.slice(i, i + chunkSize));
    }
    return chunks;
  };
  const feedbackChunks = getFeedbackChunks(feedbacks, 10);

  const responsive = [
    {
      breakpoint: 1900,
      settings: {
        slidesToShow: 4.9,
      },
    },
    {
      breakpoint: 1700,
      settings: {
        slidesToShow: 3.9,
      },
    },
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 3.5,
      },
    },
    {
      breakpoint: 1350,
      settings: {
        slidesToShow: 3.1,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2.9,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 2.7,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2.2,
      },
    },
    {
      breakpoint: 825,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1.9,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1.4,
      },
    },
    {
      breakpoint: 481,
      settings: {
        slidesToShow: 1.1,
      },
    },
  ];
  const settings = (index) => ({
    infinite: true,
    dots: false,
    speed: index % 2 === 0 ? 7500 : 12000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 5.6,
    rtl: index % 2 === 0 ? true : false,
    pauseOnHover: true,
    responsive: responsive,
    arrows: false,
  });

  return (
    <section id="kata-mereka">
      <div className="w-full py-20 ">
        <div data-aos="fade-up" data-aos-duration="500">
          <h2 className="text-center font-bold text-3xl lg:text-4xl text-gray-800">
            Apa Kata Mereka
          </h2>
          <HR.Icon className="bg-emerald-700" />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-1 ">
          {/* Generate swipers based on chunks of feedback data */}
          {feedbackChunks.map((chunk, index) => (
            <div
              key={index}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <Slider {...settings(index)}>
                {chunk.map((feedback, i) => (
                  <TestimonialCard
                    key={i}
                    isLoading={loading}
                    data={feedback}
                  />
                ))}
              </Slider>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
