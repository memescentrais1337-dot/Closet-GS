import React, { useState } from 'react';
import { Wifi, Copy, Check, ShieldCheck } from 'lucide-react';
import { ModalSheet } from './ModalSheet';
import { SEVEN_CONFIG } from '../config/seven';

interface WifiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WifiModal: React.FC<WifiModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const handleCopyPassword = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(SEVEN_CONFIG.wifi.password);
        setCopied(true);
        setCopyFailed(false);
        setTimeout(() => setCopied(false), 2500);
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch {
      // Fallback: select the manual input field
      setCopyFailed(true);
      const input = document.getElementById('wifi-password-input') as HTMLInputElement | null;
      if (input) {
        input.select();
        input.setSelectionRange(0, 99999);
      }
    }
  };

  return (
    <ModalSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Wi-Fi da Casa"
      subtitle="Conexão de alta velocidade para nossos clientes"
    >
      <div className="space-y-4">
        {/* Network Info Box */}
        <div className="bg-[#1C1E22] border border-white/10 rounded-xl p-4 space-y-3.5">
          {/* SSID */}
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-[#B8BAC0]">
              Rede (SSID)
            </div>
            <div className="flex items-center gap-2 mt-1 text-[#F5F3EE] font-semibold text-base">
              <Wifi className="w-4 h-4 text-[#FF5A16]" />
              <span>{SEVEN_CONFIG.wifi.network}</span>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Password */}
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-[#B8BAC0]">
              Senha de Acesso
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <input
                id="wifi-password-input"
                type="text"
                readOnly
                value={SEVEN_CONFIG.wifi.password}
                className="w-full bg-[#121316] text-[#F5F3EE] font-mono text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#FF5A16] select-all"
              />
              <button
                type="button"
                onClick={handleCopyPassword}
                className={`min-h-[44px] px-4 flex items-center gap-2 rounded-lg text-sm font-semibold transition-all shrink-0 active:scale-95 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#FF5A16] hover:bg-[#E54D0E] text-white glow-orange-sm'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar senha</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {copyFailed && (
          <p className="text-xs text-amber-400/90 text-center">
            Pressione e segure o campo da senha acima para copiar manualmente.
          </p>
        )}

        {/* Security / Notice */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.03] text-xs text-[#B8BAC0] leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-[#FF5A16] shrink-0 mt-0.5" />
          <span>
            Basta selecionar a rede <strong>{SEVEN_CONFIG.wifi.network}</strong> nas configurações do seu celular e colar a senha. Não é necessário realizar cadastro prévio.
          </span>
        </div>
      </div>
    </ModalSheet>
  );
};
