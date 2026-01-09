import { useState, useEffect } from "react";
import Carousel from "./components/Carousel/Carousel";
import FAQ from "./components/Faq/Faq";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import How from "./components/How/How";
import PublicHeader from "./components/PublicHeader/PublicHeader";
import TestimonialSlider from "./components/TestimonialSlider/TestimonialSlider";
import BoxLoader from "../../components/Loaders/BoxLoader/BoxLoader"; // loader component
import ParticlesCanvas from "../../components/ParticlesCanvas/ParticlesCanvas";

const Public = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulyatsiya uchun 1.5s delay, real backend fetch ishlatilsagina fetch yakunlangandan keyin setLoading(false)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <BoxLoader />
      </div>
    );
  }

  return (
    <>
      <div>
        <ParticlesCanvas />
      </div>
      <PublicHeader />
      <main>
        <Hero />
        <How />
        <Carousel />
        <TestimonialSlider />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default Public;
