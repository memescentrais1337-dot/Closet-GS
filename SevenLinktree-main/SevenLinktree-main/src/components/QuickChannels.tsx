import React from 'react';
import { MessageCircle, Instagram, ArrowUpRight } from 'lucide-react';
import { SEVEN_CONFIG } from '../config/seven';

export const QuickChannels: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {/* WhatsApp Block */}
      <a
        href={SEVEN_CONFIG.links.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col justify-between p-4 rounded-2xl bg-[#151619] hover:bg-[#1B1D22] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A16]"
        aria-label="Fale com a Seven no WhatsApp"
      >
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center transition-transform group-hover:scale-105">
            <MessageCircle className="w-5 h-5" />
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#B8BAC0] group-hover:text-[#F5F3EE] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <div className="mt-3">
          <div className="text-sm font-bold text-[#F5F3EE] tracking-tight group-hover:text-emerald-300 transition-colors">
            Fale com a Seven
          </div>
          <div className="text-[11px] text-[#B8BAC0] mt-0.5">
            WhatsApp oficial
          </div>
        </div>
      </a>

      {/* Instagram Block */}
      <a
        href={SEVEN_CONFIG.links.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col justify-between p-4 rounded-2xl bg-[#151619] hover:bg-[#1B1D22] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A16]"
        aria-label="Nosso Instagram da Seven Lounge & Drinks"
      >
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500/15 via-rose-500/15 to-purple-500/15 text-rose-400 border border-rose-500/20 flex items-center justify-center transition-transform group-hover:scale-105">
            <Instagram className="w-5 h-5" />
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#B8BAC0] group-hover:text-[#F5F3EE] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <div className="mt-3">
          <div className="text-sm font-bold text-[#F5F3EE] tracking-tight group-hover:text-rose-300 transition-colors">
            Nosso Instagram
          </div>
          <div className="text-[11px] text-[#B8BAC0] mt-0.5">
            @sevenloungedrinks
          </div>
        </div>
      </a>
    </div>
  );
};
