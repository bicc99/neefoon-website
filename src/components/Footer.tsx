// The `?react` suffix (via vite-plugin-svgr) renders the SVG inline in the DOM,
// so CSS `color` flows into the paths that use `fill="currentColor"`.
import NeefoonLogo from "../assets/icons/Neefoo-bw-logo-v3-fill-currentColor.svg?react"
import IconCoffeeCup from "../assets/icons/coffee-cup.svg?react"
import IconX from "../assets/icons/icons8-x.svg?react";
import IconFacebook from "../assets/icons/icons8-facebook.svg?react";
import IconIG from "../assets/icons/instagram-fully-fillable.svg?react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";


function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer__inner">

        <div className="footer__brand">
          <span className="logo">
            <NeefoonLogo width={28} height={28} aria-hidden="true" aria-label="Logo"/>
          </span>
          <span>Neefoon</span>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h4>{t('footer.product')}</h4>
            <Link to="/about">{t('nav.about')}</Link>
            <Link to="/support">{t('nav.support')}</Link>
          </div>

          <div className="footer__col">
            <h4>{t('footer.policies')}</h4>
            <Link to="/privacy">{t('footer.privacy')}</Link>
            <Link to="/terms">{t('footer.terms')}</Link>
          </div>

          <div className="footer__col">
            <h4>{t('footer.follow')}</h4>
            <a href="https://x.com/hello_neefoon" aria-label="X / Twitter">
              <IconX width={16} height={16} aria-hidden="true" fill="currentColor" />
            </a>
            <a href="https://www.facebook.com/neefoon" aria-label="Facebook">
              <IconFacebook width={16} height={16} aria-hidden="true" fill="currentColor" />
            </a>
            <a href="https://www.instagram.com/neefoon" aria-label="Instagram">
              <IconIG width={16} height={16} aria-hidden="true" fill="currentColor" />
            </a>
          </div>
        </div>

      </div>

      <div className="footer__base">
        <span>
          © {new Date().getFullYear()} Neefoon. Made with{" "}
          <IconCoffeeCup width="1em" height="1em" fill="currentColor" aria-label="coffee cup" />{" "}
          and care.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
