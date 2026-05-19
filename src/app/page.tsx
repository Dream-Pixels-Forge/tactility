import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import BreathSection from "@/components/BreathSection";
import FullBleedSection from "@/components/FullBleedSection";
import BentoGridSection from "@/components/BentoGridSection";
import KineticSection from "@/components/KineticSection";
import LocomotionSection from "@/components/LocomotionSection";
import NeuralSection from "@/components/NeuralSection";
import ClimaxSection from "@/components/ClimaxSection";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <main id="main-content" className="relative z-10" role="main">
        <HeroSection />
        <ManifestoSection />
        <BreathSection />
        <FullBleedSection />
        <BentoGridSection />
        <KineticSection />
        <LocomotionSection />
        <NeuralSection />
        <ClimaxSection />
        <HorizontalCarousel />
        <CtaSection />
      </main>
    </SmoothScroll>
  );
}
