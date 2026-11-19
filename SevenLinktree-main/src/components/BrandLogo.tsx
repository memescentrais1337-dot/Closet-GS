import React, { useState } from 'react';
import { SEVEN_CONFIG } from '../config/seven';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const [sourceStep, setSourceStep] = useState<'local' | 'remote' | 'vector'>('local');

  // Scaled dimensions
  const scale = size === 'sm' ? 0.8 : size === 'lg' ? 1.25 : 1;

  const logoSrc =
    sourceStep === 'local'
      ? SEVEN_CONFIG.media.officialLogoLocal
      : SEVEN_CONFIG.media.officialLogoUrl;

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* If official logo image is available and hasn't failed */}
      {sourceStep !== 'vector' ? (
        <div className="relative flex items-center justify-center">
          <img
            src={logoSrc}
            alt="Seven Lounge & Drinks"
            referrerPolicy="no-referrer"
            onError={() => {
              setSourceStep((prev) => (prev === 'local' ? 'remote' : 'vector'));
            }}
            className="h-10 w-auto object-contain transition-opacity duration-300"
            style={{
              maxHeight: size === 'sm' ? '32px' : size === 'lg' ? '52px' : '40px',
            }}
          />
        </div>
      ) : (
        /* Bulletproof Vector Craft of the SEVEN Brandmark with the signature Orange V */
        <div className="flex flex-col items-center">
          <div
            className="flex items-center font-black tracking-[0.22em] text-[#F5F3EE]"
            style={{
              fontSize: `${Math.round(26 * scale)}px`,
              lineHeight: 1,
            }}
          >
            <span>SE</span>
            <span className="text-[#FF5A16] drop-shadow-[0_0_12px_rgba(255,90,22,0.5)]">V</span>
            <span>EN</span>
          </div>

          {showSubtitle && (
            <div
              className="text-[9px] font-semibold tracking-[0.35em] text-[#B8BAC0] uppercase mt-1"
              style={{ fontSize: `${Math.round(9 * scale)}px` }}
            >
              Lounge & Drinks
            </div>
          )}
        </div>
      )}
    </div>
  );
};
