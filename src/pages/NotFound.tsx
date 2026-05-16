import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import "../styles/not-found.css";

function NotFound() {
  const { t } = useLanguage();
  useReveal();

  return (
    <>
      <Helmet>
        <title>Page Not Found - Neefoon</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="nf">

      {/* Breadcrumb */}
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">{t('nav.home')}</Link>
        <span className="crumbs__sep" aria-hidden="true">/</span>
        <span className="crumbs__current" aria-current="page">404</span>
      </nav>

      <section className="nf__hero reveal" data-reveal>
        {/* Large decorative AQI number in the background — purely visual */}
        <div className="nf__bg" aria-hidden="true">404</div>

        <div className="nf__content">
          <div className="eyebrow">{t('404.eyebrow')}</div>
          <h1 className="nf__title">
            <span>{t('404.title1')}</span>{" "}
            <span className="gradient">{t('404.title2')}</span>
          </h1>
          <p className="nf__sub">{t('404.sub')}</p>
          <Link to="/" className="nf__btn">
            {t('404.btn')}
          </Link>
        </div>
      </section>

    </main>
    </>
  );
}

export default NotFound;
