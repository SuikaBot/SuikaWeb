import About from "../../components/LandingPage/About/About";
import AnnounceBanner from "../../components/LandingPage/AnnounceBanner/AnnounceBanner";
import Footer from "../../components/LandingPage/Footer/Footer";
import Hero from "../../components/LandingPage/Hero/Hero";
import ListBot from "../../components/LandingPage/ListBot/ListBot";
import Navbar from "../../components/LandingPage/Navbar/Navbar";

import Stats from "../../components/LandingPage/Stats/Stats";

const Home = () => {
  return (
    <>
      <Navbar />
      <main id="content">
        <Hero />
        <Stats />
        <About />
        <ListBot />
        <AnnounceBanner />
      </main>
      <Footer />
    </>
  );
};

export default Home;
