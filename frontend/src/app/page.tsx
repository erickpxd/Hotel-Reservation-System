// src/app/page.tsx
import { HeroSection } from "../features/home/components/HeroSection";
import { BestHotels } from "../features/home/components/BestHotels";
import { FeaturesSection } from "../features/home/components/FeaturesSection";
import { JumaSpotlight } from "../features/home/components/JumaSpotlight";
import { Newsletter } from "../features/home/components/Newsletter";
import { HausHirtSpotlight } from "../features/home/components/HausHirtSpotlight";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
        <BestHotels />
        <FeaturesSection />
        <JumaSpotlight />
        <HausHirtSpotlight />
        <Newsletter />
      <footer className="py-2 text-center text-sm text-white bg-[#003B95]">
        © 2026 Jala University. All rights reserved.
      </footer>
    </main>
  );
}