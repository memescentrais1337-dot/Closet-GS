import React from 'react';
import { ArrowUpRight, Wine, Sparkles } from 'lucide-react';
import { SEVEN_CONFIG } from '../config/seven';

export const MenuCard: React.FC = () => {
  return (
    <a
      href={SEVEN_CONFIG.links.menu}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF5A16] via-[#F4510B] to-[#D94506] p-5 sm:p-6 text-white shadow-xl shadow-[#FF5A16]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF5A16]/30 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090B]"
      aria-label="Cardápio: Confira nosso cardápio. Ver opções e preços"
    >
      {/* Subtle interior decorative glow / reflection */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
      <div className="absolute bottom-0 right-0 opacity-10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 pointer-events-none">
        <Wine className="w-32 h-32" />
      </div>

      <div className="relative z-10 flex flex-col justify-between min-h-[104px]">
        {/* Top Tag & Icon */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/20 text-[11px] font-bold uppercase tracking-wider text-white/95 backdrop-blur-sm border border-white/15">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Cardápio Oficial</span>
          </div>

          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* Headline and Action Label */}
        <div className="mt-3">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            Confira nosso cardápio
          </h2>
          <div className="flex items-center gap-2 mt-2 font-medium text-xs sm:text-sm text-white/90">
            <Wine className="w-4 h-4 text-white/80 shrink-0" />
            <span className="font-semibold underline decoration-white/40 underline-offset-4 group-hover:decoration-white transition-colors">
              Ver opções e preços →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};
