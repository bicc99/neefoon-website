import { Helmet } from 'react-helmet-async';
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
    <>
      <Helmet>
        <title>Neefoon - Real-Time Air Quality & AQI App</title>
        <meta name="description" content="Neefoon brings real-time AQI, fire hotspot maps, and station-level pollutant data to your pocket. Free, no ads, no signup. Thailand, Southeast Asia, and worldwide coverage." />
      </Helmet>
      <main>
      <HeroSection />
      <AqiExplainerSection />
      <FeaturesSection />
      <ScreenshotCarousel />
      <DataSourcesSection />
      <SupportCtaSection />
      <FinalCtaSection />
    </main>
    </>
  );
}

export default Home;
