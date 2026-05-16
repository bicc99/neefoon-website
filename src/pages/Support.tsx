import React, { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { Link } from "react-router-dom";
import type { TranslationKey } from "../i18n/en";
import type { AqiStyle } from "../types/common";

import IconStripe    from "../assets/icons/icons8-stripe-v2.svg?react";
import IconStripe2   from "../assets/icons/icons8-stripe-single.svg?react";
import IconStar      from "../assets/icons/star_rate_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg?react";
import IconVisa      from "../assets/icons/icons8-visa.svg?react";
import IconMastercard from "../assets/icons/mastercard.svg?react";
import IconAmex      from "../assets/icons/icons8-american-express.svg?react";
import IconApplePay  from "../assets/icons/icons8-apple-pay.svg?react";
import IconGpay      from "../assets/icons/icons8-google-pay.svg?react";
import IconUnionPay  from "../assets/icons/icons8-unionpay.svg?react";
import IconJBC       from "../assets/icons/jcb.svg?react";
import IconPromptPay from "../assets/icons/PromptPay-logo-2.avif";
import IconSecurity  from "../assets/icons/shield_card_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react";
import IconLock      from "../assets/icons/lock_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react";
import IconClock     from "../assets/icons/schedule_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react";

// Vite exposes env variables prefixed with VITE_ to the browser bundle.
// In development this points to localhost; in production set it to your Render URL.
const API_URL = import.meta.env.VITE_API_URL as string;

// The two currencies users can toggle between
type Currency = 'USD' | 'THB';

// Preset donation amounts for each currency.
const PRESETS: Record<Currency, readonly number[]> = {
  USD: [3, 5, 10, 25],
  THB: [20, 50, 100, 300],
};

// Translation keys for the four preset button labels, in the same order as PRESETS
const PRESET_LABELS = ['amt.3', 'amt.5', 'amt.10', 'amt.25'] as const;

// ── Donation allocation breakdown ─────────────────────────────────────────────

interface Allocation {
  pct: string;   // CSS value passed to --p, e.g. '55%'
  color: string; // bar fill color passed to --c
  nameKey: TranslationKey;
}

const ALLOCATIONS: Allocation[] = [
  { pct: '55%', color: 'var(--teal-800)', nameKey: 'al1.n' },
  { pct: '25%', color: '#5BB39E',         nameKey: 'al2.n' },
  { pct: '15%', color: '#FDD64B',         nameKey: 'al3.n' },
  { pct: '5%',  color: '#FF9B57',         nameKey: 'al4.n' },
];

// ── FAQ items ─────────────────────────────────────────────────────────────────

interface FaqItem {
  questionKey: TranslationKey;
  answerKey: TranslationKey;
}

const FAQ_ITEMS: FaqItem[] = [
  { questionKey: 'sf.q1', answerKey: 'sf.a1' },
  { questionKey: 'sf.q2', answerKey: 'sf.a2' },
  { questionKey: 'sf.q3', answerKey: 'sf.a3' },
];

// ── Component ─────────────────────────────────────────────────────────────────

function Support() {
  const { t } = useLanguage();
  useReveal();

  // activePresetIndex: index into PRESETS[currency] (null = custom input is active)
  const [activePresetIndex, setActivePresetIndex] = useState<number | null>(1); // default = second preset ($5 / ฿50)
  const [currency, setCurrency] = useState<Currency>('THB');
  // customValue: controlled value for the "Other" input field
  const [customValue, setCustomValue] = useState<string>('');
  const customInputRef = useRef<HTMLInputElement>(null);

  // The currency symbol shown before all amounts
  const sym = currency === 'USD' ? '$' : '฿';
  const presets = PRESETS[currency];

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [donateError, setDonateError] = useState<string | null>(null);

  // The amount shown in both CTA buttons: whichever source is active
  const displayAmt = activePresetIndex !== null
    ? presets[activePresetIndex]
    : (parseInt(customValue, 10) || 0);

  // True only when a valid amount is entered — used to enable/disable the donate buttons.
  const canDonate = displayAmt > 0;

  async function handleDonate() {
    if (isRedirecting || !canDonate) return;

    setIsRedirecting(true);
    setDonateError(null);

    try {
      const res = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: displayAmt, currency }),
      });

      const data = await res.json() as { url?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? 'Something went wrong');
      }

      // Redirect the user to Stripe's hosted checkout page.
      window.location.href = data.url!;
    } catch (err) {
      console.error('Stripe redirect failed', err);
      setDonateError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsRedirecting(false);
    }
  }

  function handlePresetClick(index: number) {
    setActivePresetIndex(index);
    setCustomValue('');
    // Reset the custom input's dynamic width on mobile when switching back to a preset
    if (customInputRef.current) {
      customInputRef.current.style.width = '';
    }
  }

  // When switching currency: keep the same preset index selected, clear any custom value
  // (the old custom number doesn't mean the same thing in the new currency)
  function handleCurrencySwitch() {
    setCurrency(c => c === 'USD' ? 'THB' : 'USD');
    setCustomValue('');
    if (customInputRef.current) {
      customInputRef.current.style.width = '';
    }
    // If the user had a custom amount typed, fall back to the default preset
    if (activePresetIndex === null) {
      setActivePresetIndex(1);
    }
  }

  // Trigger the bar-fill animation when each .alloc row scrolls into view.
  // We watch at 50% visibility so the animation starts just as the row appears,
  // then unobserve so it only plays once (not on every scroll back).
  useEffect(() => {
    const allocs = document.querySelectorAll<HTMLElement>('.alloc');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    allocs.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // On mobile the input starts at 6ch (CSS). As the user types, grow it to fit
  // so the $ sign always stays snug against the number. Desktop keeps width:70%.
  function handleCustomAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.currentTarget.value;
    // Enforce the 7-digit cap that max={9999999} can't prevent when pasting
    if (val.length > 7) {
      val = val.slice(0, 7);
    }
    if (window.matchMedia('(max-width: 720px)').matches) {
      e.currentTarget.style.width = Math.max(6, val.length) + 'ch';
    }
    setCustomValue(val);
    // Deselect any preset so the custom area gets the is-active highlight
    setActivePresetIndex(null);
  }

  return (
    <>
      <Helmet>
        <title>Support Neefoon - Keep Air Data Free</title>
        <meta name="description" content="Neefoon is free, ad-free, and built by one developer. A small one-time donation keeps the servers running and new features shipping." />
      </Helmet>
      <main className="sup">
      {/* Breadcrumb */}
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">{t('nav.home')}</Link>
        <span className="crumbs__sep" aria-hidden="true">/</span>
        <span className="crumbs__current" aria-current="page">{t('nav.support')}</span>
      </nav>

      {/* -- HERO -- */}
      <section className="sup__hero reveal" data-reveal>
        <div className="sup__heroBg" aria-hidden="true"></div>
        <div className="sup__heroInner">
          <div className="sup__pill">
            <span>{t('sup.pill')}</span>
            <IconStripe width={32} height={32} fill="#5167FC" />
          </div>
          <h1 className="sup__title">
            <span>{t('sup.title1')}</span><br />
            <span className="gradient">{t('sup.title2')}</span>
          </h1>
          <p className="sup__lede">{t('sup.lede')}</p>

          <div className="sup__quickRow">
            <button className="btn--stripeFilled" onClick={handleDonate} disabled={isRedirecting || !canDonate} id="ctaPrimary">
              {isRedirecting ? <span className="btn__spinner" /> : <IconStripe2 width={14} height={14} fill="#fff" />}
              {/* t('sup.cta') = "Donate" / "บริจาค" — the amount is dynamic and reflects the active currency */}
              <span><span>{isRedirecting ? t('sup.redirecting') : t('sup.cta')}</span>{!isRedirecting && <span id="ctaAmount"> {sym}{displayAmt}</span>}</span>
            </button>
            <span className="sup__quickHint">{t('sup.quickHint')}</span>
          </div>
        </div>
      </section>

      {/* -- AMOUNT SELECTOR -- */}
      <section className="sup__amount reveal" data-reveal>
        <div className="sup__amountHead">
          <div>
            <div className="eyebrow">{t('sup.amountEy')}</div>
            <h2 className="section__title">{t('sup.amountTitle')}</h2>
          </div>

          {/* Currency toggle: lets Thai users switch between USD ($) and Thai Baht (฿).
              The knob slides right when THB is active, mirroring the language toggle. */}
          <button
            className="cur"
            onClick={handleCurrencySwitch}
            aria-label={currency === 'USD' ? 'Switch to Thai Baht (฿)' : 'Switch to US Dollar ($)'}
          >
            <div className="cur__pill" data-cur={currency}>
              <span className="cur__knob" aria-hidden="true" />
              <span className="cur__opt" data-cur="USD">{t('cur.usd')}</span>
              <span className="cur__opt" data-cur="THB">{t('cur.thb')}</span>
            </div>
          </button>
        </div>

        <div className="amounts" role="radiogroup" aria-label="Amount">
          {/* Render preset buttons dynamically from the PRESETS array so both
              currencies share the same markup — only the symbol and values differ */}
          {presets.map((amt, i) => (
            <button
              key={i}
              className={`amount${activePresetIndex === i ? ' is-active' : ''}`}
              type="button"
              onClick={() => handlePresetClick(i)}
            >
              <span className="amount__sym">{sym}</span>
              <span className="amount__val">{amt}</span>
              <span className="amount__lbl">{t(PRESET_LABELS[i])}</span>
              {/* Star badge on the second preset (index 1) — the "most popular" pick */}
              {i === 1 && <span className="amount__badge"><IconStar width={20} height={20} /></span>}
            </button>
          ))}
          <label className={`amount amount--custom${activePresetIndex === null && customValue !== '' ? ' is-active' : ''}`}>
            <span className="amount__sym">{sym}</span>
            <input
              ref={customInputRef}
              className="amount__input"
              type="number"
              min="1"
              max={9999999}
              step="1"
              placeholder="Other"
              id="amtCustom"
              inputMode="decimal"
              value={customValue}
              onChange={handleCustomAmountChange}
            />
            <span className="amount__lbl">{t('amt.other')}</span>
          </label>
        </div>

          <button className="btn--stripeFilled" onClick={handleDonate} disabled={isRedirecting || !canDonate} id="ctaPrimary2">
            {isRedirecting ? <span className="btn__spinner" /> : <IconStripe2 width={14} height={14} fill="#fff" />}
            <span><span>{isRedirecting ? t('sup.redirecting') : t('sup.continue')}</span>{!isRedirecting && <span id="ctaAmount2"> · {sym}{displayAmt}</span>}</span>
          </button>
          {donateError && <p className="sup__donateError">{donateError}</p>}

        <div className="sup__methods">
          <span className="sup__methodsLbl">{t('sup.methodsLbl')}</span>
          <div className="sup__methodsRow">
            <span className="payChip"><IconVisa       width={24} height={24} /></span>
            <span className="payChip"><IconMastercard  width={24} height={24} /></span>
            <span className="payChip"><IconAmex       width={24} height={24} /></span>
            <span className="payChip"><IconApplePay   width={24} height={24} /></span>
            <span className="payChip"><IconGpay       width={24} height={24} /></span>
            <span className="payChip"><IconUnionPay   width={24} height={24} /></span>
            <span className="payChip"><IconJBC        width={24} height={24} /></span>
            <span className="payChip"><img src={IconPromptPay} height={18} alt="PromptPay" /></span>
          </div>
        </div>
      </section>

      {/* -- TRUST -- */}
      <section className="sup__trust reveal" data-reveal>
        <div className="trust">
          <div className="trust__icon">
            <IconSecurity width={20} height={20} />
          </div>
          <div>
            <div className="trust__title">PCI DSS Level 1</div>
            <div className="trust__sub">{t('trust1.s')}</div>
          </div>
        </div>
        <div className="trust">
          <div className="trust__icon">
            <IconLock width={20} height={20} />
          </div>
          <div>
            <div className="trust__title">256-bit TLS</div>
            <div className="trust__sub">{t('trust2.s')}</div>
          </div>
        </div>
        <div className="trust">
          <div className="trust__icon">
            <IconClock width={20} height={20} />
          </div>
          <div>
            <div className="trust__title">{t('trust3.t')}</div>
            <div className="trust__sub">{t('trust3.s')}</div>
          </div>
        </div>
      </section>

      {/* -- WHERE IT GOES -- */}
      <section className="sup__where reveal" data-reveal>
        <div className="eyebrow">{t('sup.whereEy')}</div>
        <h2 className="section__title">{t('sup.whereTitle')}</h2>
        <div className="allocs">
          {ALLOCATIONS.map((alloc) => (
            <div
              key={alloc.nameKey}
              className="alloc reveal"
              data-reveal
              // CSS reads --p (bar fill width) and --c (bar color) via the .alloc ruleset.
              style={{ '--p': alloc.pct, '--c': alloc.color } as AqiStyle}
            >
              <div className="alloc__bar"><span></span></div>
              <div className="alloc__row">
                <span className="alloc__name">{t(alloc.nameKey)}</span>
                <span className="alloc__pct">{alloc.pct}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="sup__faq reveal" data-reveal>
        <div className="eyebrow">{t('sup.faqEy')}</div>
        <h2 className="section__title">{t('sup.faqTitle')}</h2>
        {FAQ_ITEMS.map((item) => (
          <details key={item.questionKey} className="faq__item">
            <summary>{t(item.questionKey)}</summary>
            <p>{t(item.answerKey)}</p>
          </details>
        ))}
      </section>

      {/* -- ALT WAYS -- */}
      <section className="sup__alt reveal" data-reveal>
        <div className="eyebrow">{t('sup.altEy')}</div>
        <h2 className="section__title">{t('sup.altTitle')}</h2>
        <div className="alt">
          <div className="alt__item">
            <div className="alt__num">01</div>
            <div className="alt__name">{t('alt1.n')}</div>
            <p className="alt__desc">{t('alt1.d')}</p>
          </div>
          <div className="alt__item">
            <div className="alt__num">02</div>
            <div className="alt__name">{t('alt2.n')}</div>
            <p className="alt__desc">{t('alt2.d')}</p>
          </div>
          <div className="alt__item">
            <div className="alt__num">03</div>
            <div className="alt__name">{t('alt3.n')}</div>
            <p className="alt__desc">{t('alt3.d')}</p>
          </div>
        </div>
        <div className="sup__contact">
          <a href="mailto:support.neefoon@gmail.com" className="sup__email">support.neefoon@gmail.com</a>
        </div>
      </section>
    </main>
    </>
  );
}

export default Support;
