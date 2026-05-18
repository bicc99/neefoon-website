import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NeefoonLogo from "../assets/icons/Neefoo-bw-logo-v3-fill-currentColor.svg?react";
import IconBurger from "../assets/icons/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react"
import IconClose from "../assets/icons/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react"
import { useLanguage } from "../i18n/LanguageContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Show the border once the user scrolls more than 8px from the top
      setIsStuck(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean up the listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar${isMenuOpen ? " is-open" : ""}${isStuck ? " is-stuck" : ""}`}>
      <Link className="nav__brand" to="/">
        <span className="logo">
          <NeefoonLogo aria-hidden="true" />
        </span>
        <span className="nav__name">Neefoon</span>
      </Link>


      <nav className="nav__links" id="navLinks">
        {/* Close the mobile menu when navigating so the drawer slides back */}
        <Link to="/" onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</Link>
        <Link to="/support" onClick={() => setIsMenuOpen(false)}>{t('nav.support')}</Link>
      </nav>

      <div className="nav__tools">
        <button
          className="lang"
          type="button"
          aria-label={lang === 'en' ? 'Switch to Thai' : 'Switch to English'}
          onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
        >
          <span className="lang__pill">
            <span className="lang__opt" data-lang="EN">EN</span>
            <span className="lang__opt" data-lang="TH">TH</span>
            <span className="lang__knob" aria-hidden="true"></span>
          </span>
        </button>
      </div>

        <button
          className="nav__burger"
          id="navBurger"
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="navLinks"
          data-open={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {/*
            Both icons live in the DOM simultaneously so CSS transitions
            can run on both (fade-out + rotate-out / fade-in + rotate-in).
            Conditionally rendering would unmount the element instantly,
            which kills any outgoing animation.
          */}
          <IconBurger className="nav__menuIcon nav__menuIcon--burger" aria-hidden="true" />
          <IconClose  className="nav__menuIcon nav__menuIcon--close"  aria-hidden="true" />
        </button>

    </header>
  );
}

export default Navbar;