import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import IconFavourite from '../../assets/icons/favorite_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg?react';
import IconStripe2   from '../../assets/icons/icons8-stripe-single.svg?react';

function SupportCtaSection() {
  const { t } = useLanguage();

  return (
    <section className="support" id="support-cta">
      <div className="support__card reveal" data-reveal>
        <div className="support__steam" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <div className="support__cup" aria-hidden="true">
          <div className="support__heart">
            <IconFavourite
              width={100} height={100}
              fill="#fff" fillOpacity={0.95}
              stroke="#fff" strokeWidth={20} strokeOpacity={0.4}
            />
          </div>
        </div>
        <div className="support__copy">
          <div className="eyebrow eyebrow--dark">Independent · ad-free</div>
          <h2 className="section__title">{t('support.title')}</h2>
          <p className="section__sub">{t('support.sub')}</p>
          <div className="support__cta">
            {/* Use React Router Link instead of a raw href so navigation stays
                inside the SPA and doesn't cause a full page reload. */}
            <Link className="btn btn--stripe" to="/support">
              <IconStripe2 width={14} height={14} fill="currentColor" />
              <span>{t('support.btn')}</span>
            </Link>
            <a className="btn btn--ghost" href="mailto:support_neefoon@gmail.com">
              <span>{t('support.btnAlt')}</span>
            </a>
          </div>
          <div className="support__small">support_neefoon@gmail.com</div>
        </div>
      </div>
    </section>
  );
}

export default SupportCtaSection;