import React, { useState } from 'react';
import { MapPin, Clock, Share2, Check } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BusinessStatus } from '../utils/schedule';
import { SEVEN_CONFIG } from '../config/seven';

interface HeaderProps {
  status: BusinessStatus;
  onOpenSchedule: () => void;
}

export const Header: React.FC<HeaderProps> = ({ status, onOpenSchedule }) => {
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Seven Lounge & Drinks | Links oficiais',
      text: 'Seu próximo encontro é aqui. Drinks, sabores e bons momentos na Seven Lounge & Drinks.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed; fallback to copy
        if ((err as Error).name !== 'AbortError') {
          copyUrl();
        }
      }
    } else {
      copyUrl();
    }
  };

  const copyUrl = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2200);
      });
    }
  };

  return (
    <header className="w-full flex items-center justify-between py-2 px-1 border-b border-white/5">
      {/* Brand logo & location tag */}
      <div className="flex items-center gap-2.5">
        <BrandLogo size="sm" showSubtitle={false} />
        <div className="h-4 w-px bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-1 text-[11px] font-medium text-[#B8BAC0] tracking-tight">
          <MapPin className="w-3.5 h-3.5 text-[#FF5A16] shrink-0" />
          <span className="truncate max-w-[130px] sm:max-w-none">{SEVEN_CONFIG.brand.locationLabel}</span>
        </div>
      </div>

      {/* Action buttons: Status/Schedule quick badge + Share button */}
      <div className="flex items-center gap-2">
        {/* Schedule button */}
        <button
          onClick={onOpenSchedule}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#151619] hover:bg-[#1E2025] border border-white/10 text-xs text-[#F5F3EE] transition-all active:scale-95 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5A16]"
          title="Ver horários da semana"
          aria-label="Ver horários de funcionamento da Seven"
        >
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              status.isOpen ? 'bg-emerald-400' : 'bg-zinc-500'
            }`}
          />
          <Clock className="w-3 h-3 text-[#B8BAC0] group-hover:text-[#FF5A16] transition-colors" />
          <span className="text-[11px] font-medium tracking-tight">
            {status.headerCompactText}
          </span>
        </button>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="relative min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-[#151619] hover:bg-[#1E2025] border border-white/10 text-[#B8BAC0] hover:text-[#F5F3EE] transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5A16]"
          title="Compartilhar página da Seven"
          aria-label="Compartilhar página"
        >
          {copiedShare ? (
            <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}

          {copiedShare && (
            <span className="absolute -bottom-7 right-0 text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-500 text-white shadow-md whitespace-nowrap animate-in fade-in">
              Link copiado!
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
