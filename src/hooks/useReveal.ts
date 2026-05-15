import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = parseInt((e.target as HTMLElement).getAttribute('data-reveal-delay') ?? '0', 10);
          if (delay) setTimeout(() => e.target.classList.add('is-in'), delay);
          else e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}
