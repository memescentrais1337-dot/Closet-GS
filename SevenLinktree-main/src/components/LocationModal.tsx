import React from 'react';
import { MapPin, Navigation, ExternalLink, Car } from 'lucide-react';
import { ModalSheet } from './ModalSheet';
import { SEVEN_CONFIG } from '../config/seven';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Como Chegar"
      subtitle="Escolha seu aplicativo preferido para traçar a rota"
    >
      <div className="space-y-5">
        {/* Abstract Map & Venue Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1E2025] to-[#121316] border border-white/10 p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF5A16]/15 text-[#FF5A16] flex items-center justify-center shrink-0 border border-[#FF5A16]/30">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[#F5F3EE]">
                {SEVEN_CONFIG.brand.name}
              </h3>
              <p className="text-xs text-[#B8BAC0] mt-1 leading-relaxed">
                {SEVEN_CONFIG.brand.fullAddress}
              </p>
            </div>
          </div>

          {/* Abstract stylized grid graphic */}
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#B8BAC0]">
            <span>Residencial Celina Park · Goiânia</span>
            <span className="font-mono text-[10px] text-white/40">
              {SEVEN_CONFIG.brand.coordinates.latitude.toFixed(4)}, {SEVEN_CONFIG.brand.coordinates.longitude.toFixed(4)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {/* Google Maps */}
          <a
            href={SEVEN_CONFIG.links.location.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full min-h-[52px] px-4 py-3 bg-[#1C1E22] hover:bg-[#23262C] border border-white/10 hover:border-white/20 rounded-xl text-[#F5F3EE] transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A16]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold">Google Maps</div>
                <div className="text-[11px] text-[#B8BAC0]">Abrir visualização e rotas</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#B8BAC0] group-hover:text-[#F5F3EE] transition-colors" />
          </a>

          {/* Waze */}
          <a
            href={SEVEN_CONFIG.links.location.waze}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full min-h-[52px] px-4 py-3 bg-[#1C1E22] hover:bg-[#23262C] border border-white/10 hover:border-white/20 rounded-xl text-[#F5F3EE] transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A16]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
                <Navigation className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold">Waze</div>
                <div className="text-[11px] text-[#B8BAC0]">Navegação com trânsito em tempo real</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#B8BAC0] group-hover:text-[#F5F3EE] transition-colors" />
          </a>

          {/* Uber */}
          <a
            href={SEVEN_CONFIG.links.location.uber}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full min-h-[52px] px-4 py-3 bg-[#1C1E22] hover:bg-[#23262C] border border-white/10 hover:border-white/20 rounded-xl text-[#F5F3EE] transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A16]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FF5A16]/10 text-[#FF5A16] flex items-center justify-center border border-[#FF5A16]/20">
                <Car className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold">Ir de Uber</div>
                <div className="text-[11px] text-[#B8BAC0]">Definir destino na Seven Lounge</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#B8BAC0] group-hover:text-[#F5F3EE] transition-colors" />
          </a>
        </div>

        <p className="text-[11px] text-[#B8BAC0]/70 text-center pt-1">
          O aplicativo do Uber abrirá com o endereço de desembarque pré-configurado.
        </p>
      </div>
    </ModalSheet>
  );
};
