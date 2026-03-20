"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Padlock } from './Icons';

// All tabs use green accent for hover/active — matches site UI
const GREEN_GLOW = [5, 150, 105]; // --accent-green rgb

// Softer spring for fluid feel
const SPRING_CONFIG = { stiffness: 170, damping: 26, mass: 1 };
const GLOW_SPRING = { stiffness: 120, damping: 20, mass: 0.8 };

function AnimatedTab({ tab, isActive, isPremium, onClick, isNew, isTopicComplete }) {
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

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
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
        tabIndex={-1}
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
  return (
    <div className="tab-bar" role="tablist">
      {tabs.map(tab => {
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
            isPremium={isPremium}
            onClick={() => setActiveTab(tab.id)}
            isNew={isNew}
            isTopicComplete={isTopicComplete}
          />
        );
      })}
    </div>
  );
}
