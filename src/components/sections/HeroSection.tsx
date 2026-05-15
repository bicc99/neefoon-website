import { useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import StoreButtons from '../StoreButtons';

import imgAqi72   from '../../assets/images/IMG_5484-aqi-72.avif';
import imgMapLight from '../../assets/images/IMG-map-light-2.avif';
import imgAqi77   from '../../assets/images/IMG_5482-aqi-77.avif';

function HeroSection() {
  const { t } = useLanguage();

  // Refs target the three phone elements so the scroll handler doesn't need
  // to query the document — keeping the effect scoped to this component.
  const leadRef  = useRef<HTMLDivElement>(null);
  const backLRef = useRef<HTMLDivElement>(null);
  const backRRef = useRef<HTMLDivElement>(null);

  // Parallax: lead phone rises as the user scrolls; back phones sink slightly.
  // passive: true tells the browser we won't call preventDefault, enabling
  // scroll performance optimisations on mobile.
  useEffect(() => {
    const lead  = leadRef.current;
    const backL = backLRef.current;
    const backR = backRRef.current;

    const onScroll = () => {
      const y = window.scrollY;
      if (lead)  lead.style.transform  = `translateX(-50%) translateY(${y * -0.04}px)`;
      if (backL) backL.style.transform = `rotate(-8deg) translateY(${20 + y * 0.02}px)`;
      if (backR) backR.style.transform = `rotate(8deg) translateY(${20 + y * 0.02}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid"></div>
        <div className="hero__blob hero__blob--a"></div>
        <div className="hero__blob hero__blob--b"></div>
      </div>

      <div className="hero__inner">
        <div className="reveal" data-reveal>
          <div className="hero__pill">
            <span className="hero__pill-dot"></span>
            <span>{t('hero.pill')}</span>
          </div>
          <h1 className="hero__title">
            <span>{t('hero.title1')}</span><br />
            <span className="gradient">{t('hero.title2')}</span>
          </h1>
          <p className="hero__sub">{t('hero.sub')}</p>

          <StoreButtons />

          <div className="hero__meta">
            <div className="meta__item"><strong>2k+</strong><span>{t('hero.meta1')}</span></div>
            <div className="meta__divider"></div>
            <div className="meta__item"><strong>Global</strong><span>{t('hero.meta2')}</span></div>
            <div className="meta__divider"></div>
            <div className="meta__item"><strong>Free</strong><span>{t('hero.meta3')}</span></div>
          </div>
        </div>

        <div className="hero__phone reveal" data-reveal data-reveal-delay="120">
          <div className="phone phone--lead" ref={leadRef}>
            <div className="phone__notch"></div>
            <img src={imgAqi72} alt="Neefoon AQI map screen" />
          </div>
          <div className="phone phone--back-l" ref={backLRef} aria-hidden="true">
            <img src={imgMapLight} alt="" />
          </div>
          <div className="phone phone--back-r" ref={backRRef} aria-hidden="true">
            <img src={imgAqi77} alt="" />
          </div>

          <span className="float-chip float-chip--a">
            <span className="aqiDot dot--good"></span>
            <span>{t('hero.chip1')}</span>
          </span>
          <span className="float-chip float-chip--b">
            <span className="aqiDot dot--unhealthy"></span>
            <span>{t('hero.chip2')}</span>
          </span>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero__scroll-line"></span>
      </div>
    </section>
  );
}

export default HeroSection;
