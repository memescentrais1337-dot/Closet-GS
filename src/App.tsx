import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroVisual } from './components/HeroVisual';
import { MenuCard } from './components/MenuCard';
import { QuickChannels } from './components/QuickChannels';
import { LocationBlock } from './components/LocationBlock';
import { UtilitiesRow } from './components/UtilitiesRow';
import { ComplementarySections } from './components/ComplementarySections';
import { LocationModal } from './components/LocationModal';
import { WifiModal } from './components/WifiModal';
import { ScheduleModal } from './components/ScheduleModal';
import { BrandLogo } from './components/BrandLogo';
import { SplashIntro } from './components/SplashIntro';
import { ClicaeCard } from './components/ClicaeCard';
import { getSevenBusinessStatus, BusinessStatus } from './utils/schedule';
import { SEVEN_CONFIG } from './config/seven';

export default function App() {
  const [status, setStatus] = useState<BusinessStatus>(() => getSevenBusinessStatus());

  // Check if intro has already been shown in this tab session
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
      }
      return !sessionStorage.getItem('seven_intro_seen');
    } catch {
      return false;
    }
  });

  // Controls the reveal and slight upward slide of the page content
  const [contentRevealed, setContentRevealed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
      }
      return !!sessionStorage.getItem('seven_intro_seen');
    } catch {
      return true;
    }
  });

  // Modal visibility states
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isWifiOpen, setIsWifiOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // Update schedule status every minute and whenever the browser tab becomes active
  useEffect(() => {
    const update = () => setStatus(getSevenBusinessStatus());

    const intervalId = setInterval(update, 60000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        update();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F3EE] flex flex-col justify-between selection:bg-[#FF5A16] selection:text-white">
      {/* Opening Intro Animation (plays once per session) */}
      {showIntro && (
        <SplashIntro
          onPageContentReveal={() => setContentRevealed(true)}
          onIntroComplete={() => setShowIntro(false)}
        />
      )}

      {/* Top ambient glow subtle blur */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-gradient-to-b from-[#FF5A16]/5 via-transparent to-transparent pointer-events-none blur-3xl z-0" />

      {/* Main Container - max-w-5xl (around 1000px) on desktop, full-width responsive on mobile */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 py-3 sm:py-6 flex-1 flex flex-col justify-start">
        {/* Short Header: Logo, location, and quick schedule status badge */}
        <div
          className={`w-full mb-3 sm:mb-4 transition-all duration-500 ease-out ${
            contentRevealed
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[10px]'
          }`}
          style={{ transitionDelay: '0ms' }}
        >
          <Header
            status={status}
            onOpenSchedule={() => setIsScheduleOpen(true)}
          />
        </div>

        {/* Responsive Layout Grid:
            - Mobile: Single editorial compact stream
            - Desktop: 2-column balanced layout (Visual presentation on left, action panel on right) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Visual Presentation & Brand Essence (lg:col-span-5) */}
          <section
            className={`lg:col-span-5 flex flex-col space-y-4 lg:sticky lg:top-6 transition-all duration-500 ease-out ${
              contentRevealed
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[10px]'
            }`}
            style={{ transitionDelay: '60ms' }}
            aria-label="Apresentação Seven Lounge & Drinks"
          >
            {/* Visual Hero Opening with atmospheric photography and V-accent line */}
            <HeroVisual />

            {/* Desktop Brand Context Card (only on large screens to anchor the left column beautifully) */}
            <div className="hidden lg:flex flex-col p-5 rounded-2xl bg-[#151619] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <BrandLogo size="md" />
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      status.isOpen ? 'bg-emerald-400 glow-orange-sm' : 'bg-zinc-500'
                    }`}
                  />
                  <span className="text-xs font-semibold text-[#F5F3EE]">
                    {status.statusLabel}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#B8BAC0] leading-relaxed">
                Ambiente contemporâneo para encontros memoráveis, drinks autorais e porções selecionadas no Residencial Celina Park.
              </p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#B8BAC0]">
                <span>Fuso oficial</span>
                <span className="text-[#F5F3EE] font-mono text-[11px]">Horário de Brasília</span>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: Action Panel (lg:col-span-7) */}
          <section
            className={`lg:col-span-7 flex flex-col space-y-3 sm:space-y-3.5 transition-all duration-500 ease-out ${
              contentRevealed
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[10px]'
            }`}
            style={{ transitionDelay: '120ms' }}
            aria-label="Painel de Ações e Links Oficiais"
          >
            {/* Bloco C: Cardápio (Destaque Principal) */}
            <MenuCard />

            {/* Bloco D: Dois blocos lado a lado (WhatsApp & Instagram) */}
            <QuickChannels />

            {/* Bloco E: Como Chegar (Google Maps, Waze, Uber) */}
            <LocationBlock onOpenLocation={() => setIsLocationOpen(true)} />

            {/* Bloco F: Linha de utilidades (Avaliar & Wi-Fi) */}
            <UtilitiesRow onOpenWifi={() => setIsWifiOpen(true)} />

            {/* Bloco G: Informações complementares (Horários de funcionamento) */}
            <ComplementarySections status={status} />

            {/* Card de divulgação Clicaê */}
            <div className="!mt-4 mb-1">
              <ClicaeCard />
            </div>
          </section>
        </div>
      </main>

      {/* Discrete, Elegant Footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 py-6 border-t border-white/5 text-center text-xs text-[#B8BAC0]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#F5F3EE]">SEVEN</span>
            <span className="text-[#FF5A16]">·</span>
            <span>Lounge & Drinks</span>
            <span className="text-white/20">|</span>
            <span className="text-[11px] text-[#B8BAC0]/80">Celina Park, Goiânia - GO</span>
          </div>

          <div className="text-[11px] text-[#B8BAC0]/60">
            © {new Date().getFullYear()} Seven Lounge & Drinks · Links oficiais
          </div>
        </div>
      </footer>

      {/* Interactive Modals & Bottom Sheets */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />

      <WifiModal
        isOpen={isWifiOpen}
        onClose={() => setIsWifiOpen(false)}
      />

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        status={status}
      />
    </div>
  );
}
