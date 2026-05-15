import { useLanguage } from '../../i18n/LanguageContext';
import StoreButtons from '../StoreButtons';

function FinalCtaSection() {
  const { t } = useLanguage();

  return (
    <section className="finalcta">
      <div className="finalcta__inner reveal" data-reveal>
        <h2>{t('final.title')}</h2>
        <p>{t('final.sub')}</p>
        <StoreButtons />
      </div>
    </section>
  );
}

export default FinalCtaSection;
