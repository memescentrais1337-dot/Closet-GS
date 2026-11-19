import React from 'react';
import { SEVEN_CONFIG } from '../config/seven';

export const ClicaeCard: React.FC = () => {
  return (
    <a
      href={SEVEN_CONFIG.links.clicae}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3.5 w-full p-4 rounded-2xl bg-[#121317] hover:bg-[#17191E] border border-[#FF5A16]/20 hover:border-[#FF5A16]/45 transition-all duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A16]"
      aria-label="Criado por Clicaê. Sua empresa também pode ter uma bio assim. Quero o meu"
    >
      <img
        src={SEVEN_CONFIG.media.clicaeLogo}
        alt="Clicaê"
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover shrink-0"
      />

      <div className="min-w-0 flex-1 text-left">
        <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#B8BAC0]">
          CRIADO POR CLICAÊ
        </div>
        <div className="text-sm font-bold text-[#F5F3EE] tracking-tight leading-snug mt-0.5">
          Sua empresa também pode ter uma bio assim.
        </div>
        <div className="text-xs font-semibold text-[#FF5A16] mt-1.5 group-hover:translate-x-0.5 transition-transform duration-200">
          Quero o meu →
        </div>
      </div>
    </a>
  );
};
