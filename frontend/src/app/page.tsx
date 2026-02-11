import { HeroSection } from "../features/home/components/HeroSection";
import { BestHotels } from "../features/home/components/BestHotels";
import { FeaturesSection } from "../features/home/components/FeaturesSection";
import { JumaSpotlight } from "../features/home/components/JumaSpotlight";
import { Newsletter } from "../features/home/components/Newsletter";
import { HausHirtSpotlight } from "../features/home/components/HausHirtSpotlight";
import { Footer } from "../shared/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <BestHotels />
      <FeaturesSection />
      <JumaSpotlight />
      <HausHirtSpotlight />
      <Newsletter />
      <Footer />
    </main>
  );
}
