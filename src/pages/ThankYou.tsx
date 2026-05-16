import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import "../styles/thank-you.css";

function ThankYou() {
  const { t } = useLanguage();
  useReveal();

  return (
    <main className="ty">

      {/* Breadcrumb */}
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">{t('nav.home')}</Link>
        <span className="crumbs__sep" aria-hidden="true">/</span>
        <Link to="/support">{t('nav.support')}</Link>
        <span className="crumbs__sep" aria-hidden="true">/</span>
        <span className="crumbs__current" aria-current="page">{t('ty.current')}</span>
      </nav>

      <section className="ty__hero reveal" data-reveal>
        {/* Large decorative checkmark in the background — purely visual */}
        <div className="ty__bg" aria-hidden="true">✓</div>

        <div className="ty__content">
          <div className="eyebrow">{t('ty.eyebrow')}</div>
          <h1 className="ty__title">
            <span>{t('ty.title1')}</span>{" "}
            <span className="gradient">{t('ty.title2')}</span>
          </h1>
          <p className="ty__sub">{t('ty.sub')}</p>
          <Link to="/" className="ty__btn">
            {t('ty.btn')}
          </Link>
        </div>
      </section>

    </main>
  );
}

export default ThankYou;
