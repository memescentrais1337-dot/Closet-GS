import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_BANNERS } from '../data/banners';

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextBanner = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_BANNERS.length);
  }, []);

  const prevBanner = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextBanner, 5500);
    return () => clearInterval(interval);
  }, [isPaused, nextBanner]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextBanner();
    } else if (distance < -50) {
      prevBanner();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const current = HERO_BANNERS[currentIndex];

  const positionClasses = {
    left: 'items-start text-left justify-center',
    center: 'items-center text-center justify-center',
    right: 'items-end text-right justify-center',
  }[current.textPosition];

  return (
    <div
      id="hero-carousel"
      className="relative w-full h-[65vh] sm:h-[75vh] max-h-[750px] min-h-[460px] bg-[#FAF2F1] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images with smooth fade */}
      {HERO_BANNERS.map((banner, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Desktop picture */}
            <img
              src={banner.imageDesktop}
              alt={banner.title}
              className="w-full h-full object-cover object-center hidden sm:block"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Mobile picture */}
            <img
              src={banner.imageMobile}
              alt={banner.title}
              className="w-full h-full object-cover object-center sm:hidden"
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            {/* Soft tint gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/15" />
          </div>
        );
      })}

      {/* Floating Text Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center">
        <div className={`flex flex-col ${positionClasses} max-w-xl text-white`}>
          {current.badge && (
            <span className="px-3 py-1 bg-white/20 backdrop-blur-xs text-white text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-3 border border-white/30">
              {current.badge}
            </span>
          )}

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1] mb-3 sm:mb-4 drop-shadow-sm">
            {current.title}
          </h2>

          <p className="text-xs sm:text-base text-white/90 leading-relaxed font-light mb-6 sm:mb-8 max-w-md">
            {current.subtitle}
          </p>

          <Link
            to={current.ctaLink}
            id="hero-cta-btn"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#171717] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#FAF7F5] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
          >
            {current.ctaText}
          </Link>
        </div>
      </div>

      {/* Arrow Controls (Desktop) */}
      <div className="hidden sm:flex items-center justify-between absolute inset-y-0 inset-x-4 z-30 pointer-events-none">
        <button
          onClick={prevBanner}
          aria-label="Banner anterior"
          className="pointer-events-auto w-11 h-11 bg-white/30 hover:bg-white text-white hover:text-[#171717] backdrop-blur-xs flex items-center justify-center transition-all border border-white/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextBanner}
          aria-label="Próximo banner"
          className="pointer-events-auto w-11 h-11 bg-white/30 hover:bg-white text-white hover:text-[#171717] backdrop-blur-xs flex items-center justify-center transition-all border border-white/20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-30 flex justify-center items-center gap-2">
        {HERO_BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir para banner ${index + 1}`}
            className={`h-1.5 transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
