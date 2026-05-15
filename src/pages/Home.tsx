import { useReveal } from '../hooks/useReveal';
import HeroSection          from '../components/sections/HeroSection';
import AqiExplainerSection  from '../components/sections/AqiExplainerSection';
import FeaturesSection      from '../components/sections/FeaturesSection';
import ScreenshotCarousel   from '../components/sections/ScreenshotCarousel';
import DataSourcesSection   from '../components/sections/DataSourcesSection';
import SupportCtaSection    from '../components/sections/SupportCtaSection';
import FinalCtaSection      from '../components/sections/FinalCtaSection';

function Home() {
  // useReveal is called once at the page level so a single IntersectionObserver
  // watches all [data-reveal] elements across every section component.
  useReveal();

  return (
    <main>
      <HeroSection />
      <AqiExplainerSection />
      <FeaturesSection />
      <ScreenshotCarousel />
      <DataSourcesSection />
      <SupportCtaSection />
      <FinalCtaSection />
    </main>
  );
}

export default Home;
