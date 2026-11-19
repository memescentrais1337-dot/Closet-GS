import React from 'react';
import { Wifi, MessageSquareHeart, ArrowUpRight } from 'lucide-react';
import { SEVEN_CONFIG } from '../config/seven';

interface UtilitiesRowProps {
  onOpenWifi: () => void;
}

export const UtilitiesRow: React.FC<UtilitiesRowProps> = ({ onOpenWifi }) => {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {/* Avaliação */}
      <a
        href={SEVEN_CONFIG.links.reviews.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#151619] hover:bg-[#1B1D22] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A16]"
        aria-label="Avaliar no Google: Deixe sua opinião sobre a Seven Lounge"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
            <MessageSquareHeart className="w-4 h-4" />
          </div>
          <div className="min-w-0 text-left">
            <div className="text-xs font-bold text-[#F5F3EE] truncate group-hover:text-amber-300 transition-colors">
              Avaliar no Google
            </div>
            <div className="text-[10px] text-[#B8BAC0]">
              Deixe sua opinião
            </div>
          </div>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#B8BAC0] group-hover:text-[#F5F3EE] shrink-0 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>

      {/* Wi-Fi da Casa */}
      <button
        type="button"
        onClick={onOpenWifi}
        className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#151619] hover:bg-[#1B1D22] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A16]"
        aria-label="Abrir painel de Wi-Fi da Seven Lounge"
      >
        <div className="flex items-center gap-2.5 min-w-0 text-left">
          <div className="w-8 h-8 rounded-lg bg-[#FF5A16]/10 text-[#FF5A16] border border-[#FF5A16]/20 flex items-center justify-center shrink-0">
            <Wifi className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-[#F5F3EE] truncate group-hover:text-white transition-colors">
              Wi-Fi da casa
            </div>
            <div className="text-[10px] text-[#B8BAC0]">
              Copiar senha
            </div>
          </div>
        </div>
        <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-[#B8BAC0] group-hover:text-[#F5F3EE] shrink-0 ml-1">
          <span className="text-[10px] font-mono font-bold">2.4G</span>
        </div>
      </button>
    </div>
  );
};
