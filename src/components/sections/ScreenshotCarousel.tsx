import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

import imgGood46sm           from '../../assets/images/IMG-good-46-sm.avif';
import imgGood46             from '../../assets/images/IMG-good-46.avif';
import imgModerate64sm       from '../../assets/images/IMG-moderate-64-sm.avif';
import imgModerate64         from '../../assets/images/IMG-moderate-64.avif';
import imgUnhealthy124sm     from '../../assets/images/IMG-unhealthy-sensitive-124-sm.avif';
import imgUnhealthy124       from '../../assets/images/IMG-unhealthy-sensitive-124.avif';
import imgVeryUnhealthy216sm from '../../assets/images/IMG-very-unhealthy-216-sm.avif';
import imgVeryUnhealthy216   from '../../assets/images/IMG-very-unhealthy-216.avif';
import imgUnhealthy172sm     from '../../assets/images/IMG-unhealthy-172-sm.avif';
import imgUnhealthy172       from '../../assets/images/IMG-unhealthy-172.avif';
import imgRanking            from '../../assets/images/IMG_5538-ranking-all.avif';
import imgRankingCountry     from '../../assets/images/IMG_5540-ranking-country.avif';
import imgRankingSea         from '../../assets/images/IMG_5539-ranking-sea.avif';

interface Slide { src: string; alt: string; }

const SLIDES: Slide[] = [
  { src: imgGood46sm,           alt: 'Neefoon AQI 46, Good (compact view)' },
  { src: imgGood46,             alt: 'Neefoon AQI 46, Good' },
  { src: imgModerate64sm,       alt: 'Neefoon AQI 64, Moderate (compact view)' },
  { src: imgModerate64,         alt: 'Neefoon AQI 64, Moderate' },
  { src: imgUnhealthy124sm,     alt: 'Neefoon AQI 124, Unhealthy for Sensitive Groups (compact view)' },
  { src: imgUnhealthy124,       alt: 'Neefoon AQI 124, Unhealthy for Sensitive Groups' },
  { src: imgVeryUnhealthy216sm, alt: 'Neefoon AQI 216, Very Unhealthy (compact view)' },
  { src: imgVeryUnhealthy216,   alt: 'Neefoon AQI 216, Very Unhealthy' },
  { src: imgUnhealthy172sm,     alt: 'Neefoon AQI 172, Unhealthy (compact view)' },
  { src: imgUnhealthy172,       alt: 'Neefoon AQI 172, Unhealthy' },
  { src: imgRanking,            alt: 'Neefoon city ranking, worldwide' },
  { src: imgRankingCountry,     alt: 'Neefoon city ranking, by country' },
  { src: imgRankingSea,         alt: 'Neefoon city ranking, Southeast Asia' },
];

function ScreenshotCarousel() {
  const { t } = useLanguage();

  // activeIdx drives dot re-renders. All other carousel state is kept in
  // mutable refs so pointer/autoplay updates don't trigger React re-renders.
  const [activeIdx, setActiveIdx] = useState(0);

  const stageRef  = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>(SLIDES.map(() => null));

  // Functions exposed to JSX event handlers via refs so we avoid stale closures.
  // These are set (and updated) inside the useEffect after all internal helpers
  // are defined, ensuring they always call the most-current versions.
  const goToFn = useRef<(i: number) => void>(() => {});
  const prevFn = useRef<() => void>(() => {});
  const nextFn = useRef<() => void>(() => {});

  useEffect(() => {
    const stage  = stageRef.current;
    const track  = trackRef.current;
    const slides = slideRefs.current.filter((el): el is HTMLDivElement => el !== null);

    if (!stage || !track || slides.length === 0) return;

    let idx       = 0;
    let dragStartX = 0;
    let dragDX     = 0;
    let dragging   = false;

    // Computes and applies the CSS transform that centers the active slide.
    // Reading getBoundingClientRect here is intentional: the slide positions
    // are layout-dependent and must be measured from the live DOM each time.
    function update() {
      const active = slides[idx];
      if (!active) return;

      const stageRect        = stage!.getBoundingClientRect();
      const trackRect        = track!.getBoundingClientRect();
      const slideRect        = active.getBoundingClientRect();
      const stagePaddingLeft = parseFloat(getComputedStyle(stage!).paddingLeft) || 0;
      const stageCenter      = stageRect.width / 2 - stagePaddingLeft;
      // slideCenter is track-local: the slide's offset from the track's left edge
      // stays constant as the track is translated, making dragDX additive.
      const slideCenter      = slideRect.left - trackRect.left + slideRect.width / 2;

      track!.style.transform = `translateX(${stageCenter - slideCenter + dragDX}px)`;

      slides.forEach((s, j) => {
        s.classList.toggle('is-active', j === idx);
        s.classList.toggle('is-near', Math.abs(j - idx) === 1);
      });

      setActiveIdx(idx); // keep React state in sync so dots re-render
    }

    function goTo(i: number) {
      idx  = Math.max(0, Math.min(slides.length - 1, i));
      dragDX = 0;
      update();
    }

    // ── Drag (pointer events) ──────────────────────────────────────────────

    function onDown(e: PointerEvent) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragging   = true;
      dragStartX = e.clientX;
      dragDX     = 0;
      track!.classList.add('is-dragging');
      // Pointer capture keeps events firing even if the pointer leaves the element.
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }

    function onMove(e: PointerEvent) {
      if (!dragging) return;
      dragDX = e.clientX - dragStartX;
      update();
    }

    function onUp() {
      if (!dragging) return;
      dragging = false;
      track!.classList.remove('is-dragging');
      const delta = dragDX;
      // rAF lets the .is-dragging removal flush so the CSS transition is
      // restored before goTo snaps the track into place.
      requestAnimationFrame(() => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap        = parseFloat(getComputedStyle(track!).gap) || 28;
        const stride     = slideWidth + gap;
        const moved      = -delta / stride;
        if (Math.abs(delta) > stride * 0.18) {
          // Small directional bias so a ~half-slide drag reliably advances.
          goTo(idx + Math.round(moved + (moved >= 0 ? 0.2 : -0.2)));
        } else {
          goTo(idx);
        }
        restartAutoplay();
      });
    }

    // Stop the browser from starting a native image/element drag that would
    // steal pointer events away from our carousel handlers.
    function onDragStart(e: Event) { e.preventDefault(); }

    // ── Autoplay ──────────────────────────────────────────────────────────
    // Advances every 3.5 s. Pauses on hover, focus, tab-hide, or off-screen.

    const AUTOPLAY_MS = 3500;
    let autoplayTimer: ReturnType<typeof setInterval> | null = null;
    let autoplayPaused = false;

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        if (!autoplayPaused) goTo((idx + 1) % slides.length);
      }, AUTOPLAY_MS);
    }

    function stopAutoplay() {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }

    // Resets the interval after a manual interaction so the next auto-advance
    // is a full 3.5 s away, not whatever was left on the old timer.
    function restartAutoplay() {
      if (autoplayTimer) { stopAutoplay(); startAutoplay(); }
    }

    const onEnter      = () => { autoplayPaused = true; };
    const onLeave      = () => { autoplayPaused = false; };
    const onVisibility = () => { autoplayPaused = document.hidden; };

    stage.addEventListener('mouseenter', onEnter);
    stage.addEventListener('mouseleave', onLeave);
    stage.addEventListener('focusin',    onEnter);
    stage.addEventListener('focusout',   onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    const intersectionObserver = new IntersectionObserver(
      (entries) => { autoplayPaused = !entries[0].isIntersecting; },
      { threshold: 0.3 }
    );
    intersectionObserver.observe(stage);

    track.addEventListener('pointerdown',   onDown);
    track.addEventListener('pointermove',   onMove);
    track.addEventListener('pointerup',     onUp);
    track.addEventListener('pointercancel', onUp);
    track.addEventListener('pointerleave',  onUp);
    track.addEventListener('dragstart',     onDragStart);

    window.addEventListener('resize', update);

    // Publish the navigation functions so JSX event handlers (prev/next buttons,
    // dots) can call into this effect's closure. Assigning after all helpers
    // are defined means the refs always point to fully-initialised functions.
    goToFn.current = goTo;
    prevFn.current = () => { goTo(idx - 1); restartAutoplay(); };
    nextFn.current = () => { goTo(idx + 1); restartAutoplay(); };

    goTo(0);

    // Start autoplay unconditionally. We can't gate it on image loads because
    // lazy images never fire 'load' until they enter the viewport, which would
    // prevent autoplay from ever starting when the carousel is below the fold.
    setTimeout(startAutoplay, 300);

    // Re-centre the track as each uncached image loads so the active slide
    // stays correctly positioned as layout shifts settle.
    const imgs = Array.from(track.querySelectorAll<HTMLImageElement>('img'));
    imgs.filter(img => !img.complete).forEach(img =>
      img.addEventListener('load', update, { once: true })
    );

    return () => {
      stopAutoplay();
      intersectionObserver.disconnect();
      track.removeEventListener('pointerdown',   onDown);
      track.removeEventListener('pointermove',   onMove);
      track.removeEventListener('pointerup',     onUp);
      track.removeEventListener('pointercancel', onUp);
      track.removeEventListener('pointerleave',  onUp);
      track.removeEventListener('dragstart',     onDragStart);
      stage.removeEventListener('mouseenter', onEnter);
      stage.removeEventListener('mouseleave', onLeave);
      stage.removeEventListener('focusin',    onEnter);
      stage.removeEventListener('focusout',   onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="carousel" id="screens">
      <div className="section__head reveal" data-reveal>
        <div className="eyebrow">In the app</div>
        <h2 className="section__title">{t('screens.title')}</h2>
        <p className="section__sub">{t('screens.sub')}</p>
      </div>

      <div className="cstage" ref={stageRef}>
        <button
          className="cnav cnav--prev"
          type="button"
          aria-label="Previous"
          onClick={() => prevFn.current()}
        >
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M15 18 L9 12 L15 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="ctrack" ref={trackRef}>
          {SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              className="cslide"
              ref={(el) => { slideRefs.current[i] = el; }}
            >
              <div className="phone phone--cs">
                <div className="phone__notch"></div>
                <img src={slide.src} alt={slide.alt} draggable={false} loading="lazy" decoding="async" />
              </div>
            </div>
          ))}
        </div>

        <button
          className="cnav cnav--next"
          type="button"
          aria-label="Next"
          onClick={() => nextFn.current()}
        >
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M9 6 L15 12 L9 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dots are rendered by React so the active class is driven by state,
          not DOM manipulation. Clicking a dot calls goToFn (no restart, matching
          the original behaviour where only prev/next reset the autoplay timer). */}
      <div className="cdots" aria-hidden="true">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`cdot${activeIdx === i ? ' is-active' : ''}`}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goToFn.current(i)}
          />
        ))}
      </div>
    </section>
  );
}

export default ScreenshotCarousel;
