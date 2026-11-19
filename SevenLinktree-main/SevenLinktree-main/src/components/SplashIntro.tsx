import React, { useState, useEffect, useRef } from 'react';
import { SEVEN_CONFIG } from '../config/seven';

interface SplashIntroProps {
  onIntroComplete: () => void;
  onPageContentReveal?: () => void;
}

export const SplashIntro: React.FC<SplashIntroProps> = ({
  onIntroComplete,
  onPageContentReveal,
}) => {
  // Animation phases:
  // 'initial': hidden, about to mount (0ms)
  // 'enter': logo fades in from opacity 0 to 1, scale 0.94 to 1 (0ms - 450ms)
  // 'glow': subtle orange aura appears behind the logo (450ms - 1000ms)
  // 'exit': logo dissolves with blur + slight scale 1.04, background fades out (1050ms - 1750ms)
  // 'done': completely finished and unmounted
  const [phase, setPhase] = useState<'initial' | 'enter' | 'glow' | 'exit' | 'done'>('initial');
  const [logoLoaded, setLogoLoaded] = useState(false);
  const finishedRef = useRef(false);

  const finishImmediately = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem('seven_intro_seen', 'true');
    } catch {
      // sessionStorage might fail in restricted iframes
    }
    setPhase('done');
    onPageContentReveal?.();
    onIntroComplete();
  };

  useEffect(() => {
    // 1. Check prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      finishImmediately();
      return;
    }

    // 2. Check if already seen this session
    try {
      const alreadySeen = sessionStorage.getItem('seven_intro_seen');
      if (alreadySeen) {
        finishImmediately();
        return;
      }
    } catch {
      // ignore
    }

    // 3. Safety fallback timer: guarantee page is NEVER stuck in black screen
    const safetyTimeout = setTimeout(() => {
      if (!finishedRef.current) {
        finishImmediately();
      }
    }, 2200);

    return () => {
      clearTimeout(safetyTimeout);
    };
  }, []);

  // Run the timed sequence once the logo starts or mounts
  useEffect(() => {
    if (phase === 'done') return;

    // Phase 1: Enter smoothly right away
    const tEnter = setTimeout(() => {
      setPhase('enter');
    }, 40);

    // Phase 2: Glow appears behind logo after pause
    const tGlow = setTimeout(() => {
      setPhase('glow');
    }, 550);

    // Phase 3: Start content reveal underneath just before dissolving
    const tReveal = setTimeout(() => {
      onPageContentReveal?.();
    }, 1100);

    // Phase 4: Exit dissolves logo and fades backdrop
    const tExit = setTimeout(() => {
      setPhase('exit');
    }, 1150);

    // Phase 5: Complete removal
    const tComplete = setTimeout(() => {
      try {
        sessionStorage.setItem('seven_intro_seen', 'true');
      } catch {
        // ignore
      }
      setPhase('done');
      finishedRef.current = true;
      onIntroComplete();
    }, 1750);

    return () => {
      clearTimeout(tEnter);
      clearTimeout(tGlow);
      clearTimeout(tReveal);
      clearTimeout(tExit);
      clearTimeout(tComplete);
    };
  }, []);

  if (phase === 'done') return null;

  // Background opacity during exit
  const isExiting = phase === 'exit';

  // Logo transform and opacity styles based on current phase
  let logoOpacity = 0;
  let logoTransform = 'scale(0.94)';
  let logoFilter = 'blur(0px)';

  if (phase === 'enter') {
    logoOpacity = 1;
    logoTransform = 'scale(1)';
    logoFilter = 'blur(0px)';
  } else if (phase === 'glow') {
    logoOpacity = 1;
    logoTransform = 'scale(1)';
    logoFilter = 'blur(0px)';
  } else if (phase === 'exit') {
    logoOpacity = 0;
    logoTransform = 'scale(1.05)';
    logoFilter = 'blur(4px)';
  }

  // Aura glow opacity
  const glowOpacity = phase === 'glow' ? 1 : phase === 'exit' ? 0.2 : 0;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#08090B] transition-opacity duration-600 ease-out select-none pointer-events-auto ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#08090B',
      }}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center p-6">
        {/* Step 3: Discrete subtle orange atmospheric glow behind the logo */}
        <div
          className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full pointer-events-none transition-all duration-700 ease-out"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 90, 22, 0.28) 0%, rgba(255, 90, 22, 0.08) 50%, transparent 75%)',
            opacity: glowOpacity,
            transform: phase === 'glow' ? 'scale(1.15)' : 'scale(0.8)',
            filter: 'blur(16px)',
          }}
        />

        {/* Step 1 & 2: Centralized prominent Seven Logo with smooth natural transition */}
        <div
          className="relative z-10 flex items-center justify-center transition-all ease-out"
          style={{
            opacity: logoOpacity,
            transform: logoTransform,
            filter: logoFilter,
            transitionDuration:
              phase === 'enter'
                ? '550ms'
                : phase === 'exit'
                ? '550ms'
                : '300ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <img
            src={SEVEN_CONFIG.media.officialLogoLocal}
            alt="Seven Lounge & Drinks"
            onLoad={() => setLogoLoaded(true)}
            onError={() => {
              // If image fails, exit immediately to never trap user
              finishImmediately();
            }}
            className="w-[160px] md:w-[200px] h-auto max-w-full object-contain pointer-events-none select-none drop-shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};
