import Carousel from "./components/Carousel/Carousel";
import FAQ from "./components/Faq/Faq";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import How from "./components/How/How";
import PublicHeader from "./components/PublicHeader/PublicHeader";
import TestimonialSlider from "./components/TestimonialSlider/TestimonialSlider";

const Public = () => {
  return (
    <>
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
