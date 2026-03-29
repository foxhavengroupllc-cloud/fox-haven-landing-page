import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import ImpactBar from '@/components/sections/ImpactBar';
import BalmSpotlight from '@/components/sections/BalmSpotlight';
import Initiatives from '@/components/sections/Initiatives';
import Mission from '@/components/sections/Mission';
import Testimonials from '@/components/sections/Testimonials';
import CtaSection from '@/components/sections/CtaSection';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ImpactBar />
      <BalmSpotlight />
      <Initiatives />
      <Mission />
      <Testimonials />
      <CtaSection />
      <Footer />
    </main>
  );
}
