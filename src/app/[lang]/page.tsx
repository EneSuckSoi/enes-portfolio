import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import Education from "@/components/Education";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main className="space-y-6 sm:space-y-8">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
