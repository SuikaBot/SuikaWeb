import About from "../../components/LandingPage/About/About";
import Footer from "../../components/LandingPage/Footer/Footer";
import Hero from "../../components/LandingPage/Hero/Hero";
import ListBot from "../../components/LandingPage/ListBot/ListBot";
import Navbar from "../../components/LandingPage/Navbar/Navbar";

import Stats from "../../components/LandingPage/Stats/Stats";
import Testimonials from "../../components/LandingPage/Testimonials/Testimonials";
import TraktirLeaderboard from "../../components/LandingPage/TraktirLeaderboard/TraktirLeaderboard";

const Home = () => {
  return (
    <>
      <section className="main">
        <Navbar />
        <main id="content">
          <Hero />
          <Stats />
          <About />
          <Testimonials />
          <TraktirLeaderboard />
          <ListBot />
          {/* <AnnounceBanner /> */}
        </main>
        <Footer />
      </section>
    </>
  );
};

export default Home;
