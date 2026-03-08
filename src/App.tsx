import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HighlightProjects } from "./components/HighlightProjects";
import { SupermarketFlyers } from "./components/SupermarketFlyers";
import { EcosystemServices } from "./components/EcosystemServices";
import { WhyCirqle } from "./components/WhyCirqle";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <HighlightProjects />
        <SupermarketFlyers />
        <EcosystemServices />
        <WhyCirqle />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}