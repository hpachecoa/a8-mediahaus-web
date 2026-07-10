import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Intro from "@/components/sections/Intro";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Portfolio from "@/components/sections/Portfolio";
import Video from "@/components/sections/Video";
import Tagline from "@/components/sections/Tagline";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Intro />
      <Services />
      <Pricing />
      <Portfolio />
      <Video />
      <Tagline />
      <About />
      <Process />
      <Contact />
      <Footer />
    </>
  );
}
