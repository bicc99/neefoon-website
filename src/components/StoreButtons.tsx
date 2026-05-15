import IconApple from '../assets/icons/apple-logo-fillable.svg?react';
import IconGplay from '../assets/icons/icons8-google-play-2.svg?react';
import { useLanguage } from '../i18n/LanguageContext';

// Download buttons for App Store and Google Play.
// Rendered in both the hero and the final call-to-action section.
function StoreButtons() {
  const { t } = useLanguage();

  return (
    <div className="store-btns">
      <a className="store" href="#" aria-label="Download on the App Store">
        <IconApple width={18} height={18} aria-hidden="true" />
        <span className="store__lines">
          <span className="store__small">{t('store.applePre')}</span>
          <span className="store__big">App Store</span>
        </span>
      </a>
      <a className="store store__google" href="#" aria-label="Get it on Google Play">
        <IconGplay width={18} height={18} aria-hidden="true" />
        <span className="store__lines">
          <span className="store__small">{t('store.googlePre')}</span>
          <span className="store__big">Google Play</span>
        </span>
      </a>
    </div>
  );
}

export default StoreButtons;
