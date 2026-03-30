import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import MissionBand from '@/components/sections/MissionBand';
import Pillars from '@/components/sections/Pillars';
import Ticker from '@/components/sections/Ticker';
import TemperatureJourney from '@/components/sections/TemperatureJourney';
import Initiatives from '@/components/sections/Initiatives';
import Testimonials from '@/components/sections/Testimonials';
import CtaSection from '@/components/sections/CtaSection';
import CustomCursor from '@/components/ui/CustomCursor';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <MissionBand />
      <Pillars />
      <Ticker />
      <TemperatureJourney />
      <Initiatives />
      <Testimonials />
      <CtaSection />
      <Footer />
      <CustomCursor />
    </main>
  );
}
