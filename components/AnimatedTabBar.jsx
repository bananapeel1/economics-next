"use client";
import { useState, useRef, useEffect } from 'react';
import { useClientValue } from '@/lib/use-client-storage';
import { motion, useSpring } from 'framer-motion';

/* F102: five springs and two motion elements per tab, 45 springs across the bar, on phones where
   the 3D tilt they drive is invisible and on machines whose owner asked for less motion. The
   springs still have to be instantiated because hooks cannot be called conditionally, but the
   values they produce are ignored, so nothing animates and no motion element re-renders on every
   frame. */
function useMotionAllowed() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const wide = window.matchMedia('(min-width: 769px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAllowed(wide.matches && !calm.matches);
    update();
    wide.addEventListener('change', update);
    calm.addEventListener('change', update);
    return () => { wide.removeEventListener('change', update); calm.removeEventListener('change', update); };
  }, []);
  return allowed;
}
import { Padlock } from './Icons';

// All tabs use green accent for hover/active — matches site UI
const GREEN_GLOW = [5, 150, 105]; // --accent-green rgb

// Softer spring for fluid feel
const SPRING_CONFIG = { stiffness: 170, damping: 26, mass: 1 };
const GLOW_SPRING = { stiffness: 120, damping: 20, mass: 0.8 };

function AnimatedTab({ tab, isActive, isFocusable, isPremium, onClick, onKeyDown, isNew, isTopicComplete }) {
  const [isHovered, setIsHovered] = useState(false);
  const isLocked = tab.premium && !isPremium;

  // The old ref-based version of this checked the same two media queries but stored the answer in
  // a ref, so a student who turned reduced motion on, or rotated a tablet across the breakpoint,
  // kept the old behaviour until something else re-rendered. useMotionAllowed re-renders (F102).

  // Fluid springs — gentle tilt instead of full flip
  const tiltX = useSpring(0, SPRING_CONFIG);
  const liftY = useSpring(0, SPRING_CONFIG);
  const itemScale = useSpring(1, SPRING_CONFIG);
  const glowOpacity = useSpring(isActive ? 0.35 : 0, GLOW_SPRING);
  const glowScale = useSpring(isActive ? 1.1 : 0.8, GLOW_SPRING);

  const motionAllowed = useMotionAllowed();

  useEffect(() => {
    // F102: was `isMobileRef.current` only, so a desktop user who asked for reduced motion still
    // got the tilt. One gate now covers narrow screens and the motion preference together.
    if (!motionAllowed) return;
    if (isHovered) {
      tiltX.set(-8);
      liftY.set(-2);
      itemScale.set(1.05);
      glowOpacity.set(0.5);
      glowScale.set(1.2);
    } else {
      tiltX.set(0);
      liftY.set(0);
      itemScale.set(1);
      glowOpacity.set(isActive ? 0.35 : 0);
      glowScale.set(isActive ? 1.1 : 0.8);
    }
  }, [isHovered, isActive, motionAllowed, tiltX, liftY, itemScale, glowOpacity, glowScale]);

  // Always green glow — no per-tab color change
  const [r, g, b] = GREEN_GLOW;
  const glowBg = `radial-gradient(circle, rgba(${r},${g},${b},var(--tab-glow-opacity)) 0%, rgba(${r},${g},${b},0.03) 60%, transparent 80%)`;

  const wrapperClasses = [
    'tab-flip-wrapper',
    isActive ? 'tab-active' : '',
    isLocked ? 'tab-premium' : '',
  ].filter(Boolean).join(' ');

  // F103: role="tab" and the click handler used to sit on this wrapper div while the real
  // <button> inside carried tabIndex={-1}, so the tab bar was unreachable by keyboard and a
  // screen reader was told the wrong element was the tab. The button below is the tab now.
  return (
    <div
      className={wrapperClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Radial gradient glow — always green */}
      <motion.div
        className="tab-glow"
        style={{
          background: glowBg,
          opacity: glowOpacity,
          scale: glowScale,
        }}
      />

      {/* Animated tab content — gentle tilt + lift, no color change on hover */}
      <motion.button
        className={`tab-face tab-face-front ${isHovered ? 'tab-face-hovered' : ''}`}
        style={{
          rotateX: tiltX,
          y: liftY,
          scale: itemScale,
          transformOrigin: 'center bottom',
        }}
        role="tab"
        aria-selected={isActive}
        tabIndex={isFocusable ? 0 : -1}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <span className="tab-icon">
          <tab.Icon size={16} />
        </span>
        {tab.id !== 'home' && tab.label}
        {isLocked && <span className="tab-lock-icon"><Padlock size={12} /></span>}
        {isNew && !isLocked && <span className="new-badge">New</span>}
        {isTopicComplete && <span className="learn-mode-complete-dot" />}
      </motion.button>
    </div>
  );
}

export default function AnimatedTabBar({ tabs, activeTab, setActiveTab, isPremium, visitedFeatures = {}, learnModeCompletions = {}, activeSection }) {
  /* F096: at 360-390px only four of the nine tabs fit, and the rest sat behind a fade that looked
     like the end of the row. The strip now scrolls the active tab into view when it changes, and
     shows a chevron while there is more to the right. */
  const barRef = useRef(null);
  const [moreRight, setMoreRight] = useState(false);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const update = () => setMoreRight(bar.scrollWidth - bar.clientWidth - bar.scrollLeft > 8);
    update();
    bar.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { bar.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [tabs.length]);
  // Keep the active tab visible in the strip — HORIZONTALLY, and once per tab change. The first
  // version called scrollIntoView on every render (its `tabs` dependency is a fresh array each render,
  // and the page re-renders on every scroll frame for the reading-progress bar), and scrollIntoView
  // also scrolls ancestors vertically: with the sticky header hidden mid-scroll it pulled `.tab-content`
  // back up by the header's height on every wheel tick. The founder felt it as scrolling that "forces
  // you back up". Only the strip's own scrollLeft moves now, and nothing can move the page.
  const lastScrolledTab = useRef(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || lastScrolledTab.current === activeTab) return;
    lastScrolledTab.current = activeTab;
    const idx = tabs.findIndex((t) => t.id === activeTab);
    const el = idx >= 0 ? bar.querySelectorAll('[role="tab"]')[idx] : null;
    if (!el) return;
    const b = bar.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const padStart = 14;
    const padEnd = parseFloat(getComputedStyle(bar).scrollPaddingInlineEnd) || 14; // clears the ⋯ chevron on phones
    let delta = 0;
    if (r.right > b.right - padEnd) delta = r.right - (b.right - padEnd);
    else if (r.left < b.left + padStart) delta = r.left - (b.left + padStart);
    if (delta) { try { bar.scrollBy({ left: delta, behavior: 'smooth' }); } catch { bar.scrollLeft += delta; } }
  }, [activeTab, tabs.length]);

  // F103: arrow keys move between tabs, which is what a tablist is expected to do. Home and End
  // jump to the ends. The focused tab is activated, matching how the mouse behaves here.
  function handleKeyDown(e, index) {
    const last = tabs.length - 1;
    let next = null;
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActiveTab(tabs[next].id);
    const bar = e.currentTarget.closest('.tab-bar');
    const target = bar?.querySelectorAll('[role="tab"]')[next];
    if (target) target.focus();
  }

  // A tablist needs exactly one tab in the tab order. When activeTab matches nothing on screen
  // (the overview, for instance) every tab would otherwise be tabIndex=-1 and the whole bar would
  // be unreachable by keyboard — worse than the defect this fixes. Fall back to the first tab.
  const activeIndex = tabs.findIndex((t) => t.id === activeTab);
  const focusIndex = activeIndex >= 0 ? activeIndex : 0;

  const [learnModeSeen] = useClientValue(
    () => localStorage.getItem('revvy_learnmode_seen') === 'true',
    false,
    [],
  );

  return (
    <div className="tab-bar-wrap">
    <div className="tab-bar" role="tablist" ref={barRef}>
      {tabs.map((tab, tabIndex) => {
        const isLearnMode = tab.id === 'learn-mode';
        const isTopicComplete = isLearnMode && learnModeCompletions[activeSection];
        // F118: this read localStorage during render, so the server drew the "New" badge and the
        // client did not. `learnModeSeen` comes from an effect instead.
        const isNew = isLearnMode
          ? (!visitedFeatures['tab-learn-mode'] && !learnModeSeen)
          : (tab.id === 'extras' && !visitedFeatures[`tab-${tab.id}`]);

        return (
          <AnimatedTab
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            isFocusable={tabIndex === focusIndex}
            isPremium={isPremium}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tabIndex)}
            isNew={isNew}
            isTopicComplete={isTopicComplete}
          />
        );
      })}
    </div>
    {moreRight && (
      <button type="button" className="tab-bar-more" aria-label="More tabs"
        onClick={() => { const bar = barRef.current; if (bar) bar.scrollBy({ left: Math.max(160, bar.clientWidth * 0.6), behavior: 'smooth' }); }}>
        &rsaquo;
      </button>
    )}
    </div>
  );
}
