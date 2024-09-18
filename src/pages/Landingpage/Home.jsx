import { Helmet } from "react-helmet-async";

import About from "../../components/LandingPage/About/About";
import AnnounceBanner from "../../components/LandingPage/AnnounceBanner/AnnounceBanner";
import Footer from "../../components/LandingPage/Footer/Footer";
import Hero from "../../components/LandingPage/Hero/Hero";
import ListBot from "../../components/LandingPage/ListBot/ListBot";
import Navbar from "../../components/LandingPage/Navbar/Navbar";

import Stats from "../../components/LandingPage/Stats/Stats";
import Testimonials from "../../components/LandingPage/Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>SuikaBot</title>
      </Helmet>
      <section className="main">
        <Navbar />
        <main id="content">
          <Hero />
          <Stats />
          <About />
          <Testimonials />
          <ListBot />
          <AnnounceBanner />
        </main>
        <Footer />
      </section>
    </>
  );
};

export default Home;
