'use client';
import { useEffect } from 'react';

export default function UnitScrollBar() {
  useEffect(() => {
    function onScroll() {
      const el = document.getElementById('eup-scroll-fill');
      if (!el) return;
      const max = document.body.scrollHeight - window.innerHeight;
      el.style.width = max > 0 ? (window.scrollY / max * 100).toFixed(1) + '%' : '0%';
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('elp-visible');
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.elp-fade-up').forEach(el => obs.observe(el));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
    };
  }, []);

  return null;
}
