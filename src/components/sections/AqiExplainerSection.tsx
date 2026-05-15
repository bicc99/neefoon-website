import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/en';
import type { AqiStyle } from '../../types/common';

interface AqiLevel {
  value: number;
  range: string;
  color: string;        // card background
  textColor: string;    // text color on that background
  barPercent: number;   // fill width of the visual indicator bar
  nameKey: TranslationKey;
  adviceKey: TranslationKey;
}

// All six EPA AQI breakpoints in order of severity.
// Colors match the official EPA/US-AQI standard used throughout the app.
const AQI_LEVELS: AqiLevel[] = [
  { value: 25,  range: '0-50',    color: '#A8E05F', textColor: '#1f2a08', barPercent: 5,  nameKey: 'aqi.good',          adviceKey: 'lvl1.advice' },
  { value: 78,  range: '51-100',  color: '#FDD64B', textColor: '#3a2f08', barPercent: 16, nameKey: 'aqi.moderate',      adviceKey: 'lvl2.advice' },
  { value: 125, range: '101-150', color: '#FF9B57', textColor: '#3a1f08', barPercent: 25, nameKey: 'aqi.sensitive',     adviceKey: 'lvl3.advice' },
  { value: 168, range: '151-200', color: '#FE6A69', textColor: '#fff',    barPercent: 34, nameKey: 'aqi.unhealthy',     adviceKey: 'lvl4.advice' },
  { value: 242, range: '201-300', color: '#A97ABC', textColor: '#fff',    barPercent: 48, nameKey: 'aqi.veryUnhealthy', adviceKey: 'lvl5.advice' },
  { value: 340, range: '300+',    color: '#7A2937', textColor: '#fff',    barPercent: 68, nameKey: 'aqi.hazardous',     adviceKey: 'lvl6.advice' },
];

function AqiExplainerSection() {
  const { t } = useLanguage();

  return (
    <section className="explainer reveal" data-reveal id="scale">
      <div className="explainer__head">
        <div className="eyebrow">Understanding AQI</div>
        <h2 className="section__title">{t('explainer.title')}</h2>
        <p className="section__sub">{t('explainer.sub')}</p>
      </div>

      <div className="explainer__grid">
        {AQI_LEVELS.map((level) => (
          <article
            key={level.nameKey}
            className="lvl reveal"
            data-reveal
            // CSS reads --c (bg color), --t (text color), --p (bar fill %)
            // via the .lvl ruleset to avoid duplicating these values in CSS.
            style={{ '--c': level.color, '--t': level.textColor, '--p': level.barPercent } as AqiStyle}
          >
            <div className="lvl__top">
              <span className="lvl__num">{level.value}</span>
              <span className="lvl__range">{level.range}</span>
            </div>
            <div className="lvl__name">{t(level.nameKey)}</div>
            <p className="lvl__advice">{t(level.adviceKey)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AqiExplainerSection;
