import { useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/en';
import type { AqiStyle } from '../../types/common';

import imgAqi85       from '../../assets/images/IMG_5534-aqi-85.avif';
import imgMapLight    from '../../assets/images/IMG-map-light-2.avif';
import imgMapDark     from '../../assets/images/IMG-map-dark-2.avif';
import imgRanking     from '../../assets/images/IMG_5538-ranking-all.avif';
import imgUnhealthy124 from '../../assets/images/IMG-unhealthy-sensitive-124.avif';

// Bubble overlays for the live-map art. Each bubble shows a sample AQI reading
// at a specific position on the phone screenshot.
const MAP_BUBBLES = [
  { value: 22,  color: '#A8E05F', textColor: '#1f2a08', x: '-3%',  y: '24%', delay: '0s',   large: false },
  { value: 87,  color: '#FDD64B', textColor: '#3a2f08', x: '78%',  y: '22%', delay: '.4s',  large: false },
  { value: 132, color: '#FF9B57', textColor: '#3a1f08', x: '12%',  y: '43%', delay: '.8s',  large: false },
  { value: 168, color: '#FE6A69', textColor: '#fff',    x: '104%', y: '42%', delay: '1.2s', large: false },
  { value: 241, color: '#A97ABC', textColor: '#fff',    x: '-4%',  y: '55%', delay: '1.6s', large: false },
  { value: 318, color: '#7A2937', textColor: '#fff',    x: '103%', y: '56%', delay: '2.0s', large: true  },
] as const;

// Copy data for each feature card. The artwork is rendered per-feature below
// in renderArt() because each card has distinct, non-repeating visuals.
interface FeatureCopy {
  num: string;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  pointKeys: TranslationKey[];
  reversed: boolean;       // adds .feat--rev to reverse the copy/art layout
  pairArt?: true;          // adds .feat__art--pair for the dual-phone layout (feature 02)
}

const FEATURES: FeatureCopy[] = [
  {
    num: '01',
    titleKey: 'feat1.title',
    bodyKey: 'feat1.body',
    pointKeys: ['feat1.p1', 'feat1.p2', 'feat1.p3'],
    reversed: false,
  },
  {
    num: '02',
    titleKey: 'feat2.title',
    bodyKey: 'feat2.body',
    pointKeys: ['feat2.p1', 'feat2.p2', 'feat2.p3'],
    reversed: true,
    pairArt: true,
  },
  {
    num: '03',
    titleKey: 'feat3.title',
    bodyKey: 'feat3.body',
    pointKeys: ['feat3.p1', 'feat3.p3'],
    reversed: false,
  },
  {
    num: '04',
    titleKey: 'feat4.title',
    bodyKey: 'feat4.body',
    pointKeys: ['feat4.p1', 'feat4.p2', 'feat4.p3'],
    reversed: true,
  },
];

function FeaturesSection() {
  const { t } = useLanguage();

  // The rankings phone (feature 03) gets a ref so the stagger animation
  // can be triggered the first time it scrolls into view, without scanning
  // the whole document.
  const rankPhoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rankPhoneRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Each feature card has unique artwork, so we render it by feature number
  // rather than trying to encode the JSX structure in a data array.
  function renderArt(num: string) {
    switch (num) {
      case '01':
        return (
          <div className="phone phone--map">
            <div className="phone__notch"></div>
            <img src={imgAqi85} alt="AQI map" loading="lazy" decoding="async" />
            <div className="bubbles" data-bubbles>
              {MAP_BUBBLES.map((b) => (
                <span
                  key={b.value}
                  className={`bub${b.large ? ' bub--lg' : ''}`}
                  style={{ '--c': b.color, '--t': b.textColor, '--x': b.x, '--y': b.y, '--d': b.delay } as AqiStyle}
                >
                  <span>{b.value}</span>
                </span>
              ))}
            </div>
          </div>
        );

      case '02':
        // Two phones side-by-side; the parent div gets .feat__art--pair
        return (
          <>
            <div className="phone phone--sm">
              <div className="phone__notch"></div>
              <img src={imgMapLight} alt="Hotspot map light" loading="lazy" decoding="async" />
            </div>
            <div className="phone phone--sm phone--shift">
              <div className="phone__notch"></div>
              <img src={imgMapDark} alt="Hotspot map dark" loading="lazy" decoding="async" />
            </div>
          </>
        );

      case '03':
        // data-rank is read by CSS; the ref replaces the old document.querySelector
        return (
          <div className="phone phone--rank" data-rank ref={rankPhoneRef}>
            <div className="phone__notch"></div>
            <img src={imgRanking} alt="AQI ranking" loading="lazy" decoding="async" />
          </div>
        );

      case '04':
        return (
          <div className="phone phone--trend" data-trend>
            <div className="phone__notch"></div>
            <img src={imgUnhealthy124} alt="Station deep-dive" loading="lazy" decoding="async" />
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <section className="features" id="features">
      <div className="section__head reveal" data-reveal>
        <div className="eyebrow">What's inside</div>
        <h2 className="section__title">{t('features.title')}</h2>
        <p className="section__sub">{t('features.sub')}</p>
      </div>

      <div className="features__grid">
        {FEATURES.map((feature) => (
          <article
            key={feature.num}
            className={`feat${feature.reversed ? ' feat--rev' : ''} reveal`}
            data-reveal
          >
            <div className="feat__copy">
              <div className="feat__num">{feature.num}</div>
              <h3>{t(feature.titleKey)}</h3>
              <p>{t(feature.bodyKey)}</p>
              <ul className="feat__pts">
                {feature.pointKeys.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            </div>

            <div className={`feat__art${feature.pairArt ? ' feat__art--pair' : ''}`}>
              {renderArt(feature.num)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
