import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent relative selection:bg-primary/30">
      <PageTransition />
      <AnimatedBackground />
      <Navigation />
      <HeroSection />

      <AboutSection />
      <SkillsSection />
      <InteractiveTerminal />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
