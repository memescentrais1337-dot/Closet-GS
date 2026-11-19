import React from 'react';
import { MapPin, ChevronRight, Navigation } from 'lucide-react';

interface LocationBlockProps {
  onOpenLocation: () => void;
}

export const LocationBlock: React.FC<LocationBlockProps> = ({ onOpenLocation }) => {
  return (
    <button
      type="button"
      onClick={onOpenLocation}
      className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-[#151619] hover:bg-[#1B1D22] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A16]"
      aria-label="Como chegar: Te esperamos no Celina Park. Ver rotas"
    >
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#FF5A16]/10 text-[#FF5A16] border border-[#FF5A16]/20 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-bold text-[#F5F3EE] tracking-tight group-hover:text-white transition-colors">
            Te esperamos no Celina Park.
          </div>
          <div className="text-xs text-[#B8BAC0] mt-0.5 flex items-center gap-1.5">
            <Navigation className="w-3 h-3 text-[#FF5A16]" />
            <span>Google Maps · Waze · Ir de Uber</span>
          </div>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-[#B8BAC0] group-hover:text-[#F5F3EE] transition-colors shrink-0">
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </button>
  );
};
