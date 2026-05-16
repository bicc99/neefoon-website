import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import IconFacebook from "../assets/icons/icons8-facebook.svg?react";
import IconEmail from "../assets/icons/mail_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react";
import IconLinkedIn from "../assets/icons/linkedin-fillable.svg?react";
import IconIG from "../assets/icons/instagram-fully-fillable.svg?react";
import IconStripe from "../assets/icons/icons8-stripe-single.svg?react";

function About() {
  const { t } = useLanguage();
  useReveal();

  return (
    <main className="abt">

    {/* Breadcrumb */}
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to={"/"}>{t('nav.home')}</Link>
        <span className="crumbs__sep" aria-hidden="true">/</span>
        <span className="crumbs__current" aria-current="page">{t('nav.about')}</span>
      </nav>

    {/* -- HERO -- */}
    <section className="abt__hero reveal" data-reveal>
      <div className="abt__heroBg" aria-hidden="true"></div>
      <div className="abt__heroInner">
        <div className="eyebrow" data-i18n="abt.eyebrow">{t('abt.eyebrow')}</div>
        <h1 className="abt__title">
          <span data-i18n="abt.title1">{t('abt.title1')}</span><br/>
          <span className="gradient" data-i18n="abt.title2">{t('abt.title2')}</span>
        </h1>
        <p className="abt__lede" data-i18n="abt.lede">{t('abt.lede')}</p>
      </div>
    </section>

    {/* -- STATS -- */}
    <section className="abt__stats reveal" data-reveal>
      <div className="abtStat">
        <div className="abtStat__num">2k+</div>
        <div className="abtStat__lbl" data-i18n="stat1">{t('stat1')}</div>
      </div>
      <div className="abtStat">
        <div className="abtStat__num">24/7</div>
        <div className="abtStat__lbl" data-i18n="stat2">{t('stat2')}</div>
      </div>
      <div className="abtStat">
        <div className="abtStat__num">0</div>
        <div className="abtStat__lbl" data-i18n="stat3">{t('stat3')}</div>
      </div>
      <div className="abtStat">
        <div className="abtStat__num">2026</div>
        <div className="abtStat__lbl" data-i18n="stat4">{t('stat4')}</div>
      </div>
    </section>

    {/* -- STORY -- */}
    <section className="abt__story reveal" data-reveal>
      <div className="eyebrow" data-i18n="abt.storyEy">{t('abt.storyEy')}</div>
      <h2 className="abt__h2" data-i18n="abt.storyTitle">{t('abt.storyTitle')}</h2>
      <div className="abt__story-grid">
        <p data-i18n="abt.story1">{t('abt.story1')}</p>
        <p data-i18n="abt.story2">{t('abt.story2')}</p>
      </div>
    </section>

    {/* -- VALUES -- */}
    <section className="abt__values reveal" data-reveal>
      <div className="eyebrow" data-i18n="abt.valuesEy">{t('abt.valuesEy')}</div>
      <h2 className="abt__h2" data-i18n="abt.valuesTitle">{t('abt.valuesTitle')}</h2>
      <div className="vals">
        <div className="val">
          <div className="val__num">01</div>
          <h3 className="val__name" data-i18n="val1.t">{t('val1.t')}</h3>
          <p className="val__desc" data-i18n="val1.d">{t('val1.d')}</p>
        </div>
        <div className="val">
          <div className="val__num">02</div>
          <h3 className="val__name" data-i18n="val2.t">{t('val2.t')}</h3>
          <p className="val__desc" data-i18n="val2.d">{t('val2.d')}</p>
        </div>
        <div className="val">
          <div className="val__num">03</div>
          <h3 className="val__name" data-i18n="val3.t">{t('val3.t')}</h3>
          <p className="val__desc" data-i18n="val3.d">{t('val3.d')}</p>
        </div>
      </div>
    </section>

    {/* -- DATA SOURCES -- */}
    <section className="abt__cols reveal" data-reveal>
      <div className="abtCol">
        <div className="eyebrow" data-i18n="abt.dataEy">{t('abt.dataEy')}</div>
        <h2 className="abt__h3" data-i18n="abt.dataTitle">{t('abt.dataTitle')}</h2>
        <ul className="abtList">
          <li><strong>Air4Thai</strong> <span data-i18n="data1">{t('data1')}</span></li>
          <li><strong>AirGradient</strong> <span data-i18n="data2">{t('data2')}</span></li>
          <li><strong>NASA FIRMS</strong> <span data-i18n="data3">{t('data3')}</span></li>
          <li><strong>OpenStreetMap</strong> <span data-i18n="data4">{t('data4')}</span></li>
          <li><strong>EPA</strong> <span data-i18n="data5">{t('data5')}</span></li>
        </ul>
      </div>
    </section>

    {/* -- TEAM -- */}
    <section className="abt__team reveal" data-reveal>
      <div className="eyebrow" data-i18n="abt.teamEy">{t('abt.teamEy')}</div>
      <h2 className="abt__h2" data-i18n="abt.teamTitle">Just me</h2>

      <article className="maker">
        <div className="maker__avatar" aria-hidden="true">BS</div>
        <div className="maker__body">
          <div className="maker__row">
            <h3 className="maker__name">Bic Sittipun</h3>
            <span className="maker__role" data-i18n="m1.r">{t('m1.r')}</span>
          </div>
          <p className="maker__bio" data-i18n="m1.b">{t('m1.b')}</p>
          <div className="maker__contact">
            <div className="maker__socials" aria-label="Social links">
              <a className="maker__social" href="mailto:support.neefoon@gmail.com" aria-label="Email">
                <IconEmail width={16} height={16} aria-hidden="true"/>
              </a>
              <a className="maker__social" href="https://au.linkedin.com/in/bicc99" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <IconLinkedIn width={16} height={16} aria-hidden="true"/>
              </a>
              <a className="maker__social" href="https://www.instagram.com/just_bic" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <IconIG width={16} height={16} aria-hidden="true"/>
              </a>
              <a className="maker__social" href="https://www.facebook.com/songpon.sittipun/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <IconFacebook width={16} height={16} aria-hidden="true"/>
              </a>
            </div>
          </div>
        </div>
      </article>
    </section>

  {/* -- CTA STRIP -- */}
    <section className="abt__cta reveal" data-reveal>
      <div className="abtCta">
        <div>
          <h2 className="abtCta__title" data-i18n="abt.ctaTitle">{t('abt.ctaTitle')}</h2>
          <p className="abtCta__sub" data-i18n="abt.ctaSub">{t('abt.ctaSub')}</p>
        </div>
        <Link className="btn--stripeFilled" to="/support">
          <IconStripe width={16} height={16} fill="#fff" aria-hidden="true" />
          <span data-i18n="abt.ctaBtn">{t('abt.ctaBtn')}</span>
        </Link>
      </div>
    </section>


  </main>
  );
}

export default About;
