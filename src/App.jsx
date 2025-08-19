import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Gallery from "./components/Gallery";
import Sounds from "./components/Sounds";
import Film from "./components/Film";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Header />
      <Hero />
      <AboutSection />
      <Gallery />
      <Sounds />
      <Film />
      <Footer />
    </main>
  );
}
