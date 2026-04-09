'use client';

import { useEffect, useRef } from 'react';

export default function LandingScrollBar() {
  const fillRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (fillRef.current && max > 0) {
        fillRef.current.style.width = (window.scrollY / max * 100).toFixed(1) + '%';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('elp-visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    const elements = document.querySelectorAll('.elp-fade-up');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="elp-scroll-bar">
      <div className="elp-scroll-fill" ref={fillRef} />
    </div>
  );
}
