import React, { useState } from 'react';
import { SEVEN_CONFIG } from '../config/seven';

interface HeroVisualProps {
  className?: string;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ className = '' }) => {
  // Cascading image fallback state:
  // 0: officialBannerWebp
  // 1: officialBannerPng
  // 2: localAmbianceBanner
  // 3: pure CSS elegant dark mesh fallback
  const [imageStep, setImageStep] = useState<number>(0);

  const getSource = () => {
    switch (imageStep) {
      case 0:
        return SEVEN_CONFIG.media.officialBannerWebp;
      case 1:
        return SEVEN_CONFIG.media.officialBannerPng;
      case 2:
      default:
        return SEVEN_CONFIG.media.localAmbianceBanner;
    }
  };

  const handleImageError = () => {
    setImageStep((prev) => Math.min(prev + 1, 3));
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#121316] ${className}`}>
      {/* Background Image / Atmosphere */}
      <div className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-full lg:min-h-[380px] overflow-hidden">
        {imageStep < 3 ? (
          <img
            src={getSource()}
            alt="Ambiente da Seven Lounge & Drinks"
            onError={handleImageError}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] transition-transform duration-700 hover:scale-105"
            loading="eager"
          />
        ) : (
          /* High-aesthetic CSS mesh if all images fail */
          <div className="w-full h-full bg-gradient-to-br from-[#1E2025] via-[#121316] to-[#08090B]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FF5A16]/20 via-transparent to-transparent" />
          </div>
        )}

        {/* Multi-layered dark scrim for immaculate contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/80 via-transparent to-[#08090B]/40" />

        {/* Brand identity badge inside hero */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-[#F5F3EE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A16]" />
            <span>Celina Park · Goiânia</span>
          </div>
        </div>

        {/* Atmospheric Typography Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-6">
          <div className="space-y-1.5 max-w-md">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F3EE] tracking-tight leading-[1.15] drop-shadow-sm text-balance">
              Seu próximo encontro é aqui.
            </h1>
            <p className="text-xs sm:text-sm text-[#B8BAC0] leading-relaxed">
              Drinks, sabores e bons momentos na Seven.
            </p>
          </div>
        </div>
      </div>

      {/* Authorial V-Line decorative accent:
          A razor-thin 1px/1.5px orange line featuring an angular chevron turn inspired by the Seven V geometry */}
      <div className="relative w-full overflow-hidden h-3 bg-[#08090B]" aria-hidden="true">
        <svg
          className="w-full h-full text-[#FF5A16]"
          viewBox="0 0 600 12"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 6 L 240 6 L 255 11 L 270 1 L 285 6 L 600 6"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeOpacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
};
