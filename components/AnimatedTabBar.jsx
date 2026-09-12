"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Padlock } from './Icons';

// All tabs use green accent for hover/active — matches site UI
const GREEN_GLOW = [5, 150, 105]; // --accent-green rgb

// Softer spring for fluid feel
const SPRING_CONFIG = { stiffness: 170, damping: 26, mass: 1 };
const GLOW_SPRING = { stiffness: 120, damping: 20, mass: 0.8 };

function AnimatedTab({ tab, isActive, isFocusable, isPremium, onClick, onKeyDown, isNew, isTopicComplete }) {
  const [isHovered, setIsHovered] = useState(false);
  const isLocked = tab.premium && !isPremium;

  // Detect mobile / reduced motion
  const isMobileRef = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    isMobileRef.current = mq.matches || motionMq.matches;
    const handler = () => { isMobileRef.current = mq.matches || motionMq.matches; };
    mq.addEventListener('change', handler);
    motionMq.addEventListener('change', handler);
    return () => {
      mq.removeEventListener('change', handler);
      motionMq.removeEventListener('change', handler);
    };
  }, []);

  // Fluid springs — gentle tilt instead of full flip
  const tiltX = useSpring(0, SPRING_CONFIG);
  const liftY = useSpring(0, SPRING_CONFIG);
  const itemScale = useSpring(1, SPRING_CONFIG);
  const glowOpacity = useSpring(isActive ? 0.35 : 0, GLOW_SPRING);
  const glowScale = useSpring(isActive ? 1.1 : 0.8, GLOW_SPRING);

  useEffect(() => {
    if (isMobileRef.current) return;
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
  }, [isHovered, isActive, tiltX, liftY, itemScale, glowOpacity, glowScale]);

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

  return (
    <div className="tab-bar" role="tablist">
      {tabs.map((tab, tabIndex) => {
        const isLearnMode = tab.id === 'learn-mode';
        const isTopicComplete = isLearnMode && learnModeCompletions[activeSection];
        const isNew = isLearnMode
          ? (!visitedFeatures['tab-learn-mode'] && (typeof window === 'undefined' || localStorage.getItem('revvy_learnmode_seen') !== 'true'))
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
  );
}
