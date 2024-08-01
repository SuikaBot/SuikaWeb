import About from "../../components/About/About";
import AnnounceBanner from "../../components/AnnounceBanner/AnnounceBanner";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import ListBot from "../../components/ListBot/ListBot";
import Navbar from "../../components/Navbar/Navbar";

import Stats from "../../components/Stats/Stats";

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
