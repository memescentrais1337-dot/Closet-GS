import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { STORE_SETTINGS } from '../data/settings';
import { Sparkles, Shield, HeartHandshake, Eye } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div id="about-page" className="min-h-screen bg-white pb-20">
      <Breadcrumb items={[{ label: 'Sobre Nós' }]} />

      {/* Header Banner */}
      <div className="bg-[#FAF2F1] border-b border-[#F1E2E1] py-12 sm:py-16 px-4 sm:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5360] font-semibold mb-2 block">
            Nossa História
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] font-normal">
            Sobre o {STORE_SETTINGS.name}
          </h1>
          <p className="font-serif text-base sm:text-lg italic text-[#6F6F6F] mt-3">
            "{STORE_SETTINGS.tagline}"
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-4 text-xs sm:text-sm text-[#6F6F6F] leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal">
              Elegância atemporal para mulheres contemporâneas
            </h2>
            <p>
              O <strong>{STORE_SETTINGS.name}</strong> nasceu do desejo de criar uma experiência de moda feminina sofisticada, descomplicada e acolhedora. Acreditamos que se vestir bem é uma forma de expressão pessoal e autoestima.
            </p>
            <p>
              Cada peça do nosso catálogo é escolhida com rigor através de uma curadoria minuciosa, priorizando caimento impecável, tecidos nobres como linho puro, viscose acetinada e alfaiataria premium.
            </p>
          </div>
          <div className="aspect-[4/5] bg-[#FAF2F1] overflow-hidden border border-[#F1E2E1]">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
              alt="Ateliê Closet GS"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#F1E2E1]">
          <div className="p-6 bg-[#FAF2F1] border border-[#F1E2E1] text-center space-y-2">
            <Sparkles className="w-6 h-6 text-[#BE5B6C] mx-auto" />
            <h3 className="font-serif text-lg text-[#171717]">Curadoria Rigorosa</h3>
            <p className="text-xs text-[#6F6F6F] leading-relaxed">
              Seleção exclusiva de modelagens que valorizam a silhueta com conforto e elegância.
            </p>
          </div>

          <div className="p-6 bg-[#FAF2F1] border border-[#F1E2E1] text-center space-y-2">
            <HeartHandshake className="w-6 h-6 text-[#BE5B6C] mx-auto" />
            <h3 className="font-serif text-lg text-[#171717]">Atendimento Próximo</h3>
            <p className="text-xs text-[#6F6F6F] leading-relaxed">
              Consultoria personalizada via WhatsApp para tirar dúvidas de medidas e combinações.
            </p>
          </div>

          <div className="p-6 bg-[#FAF2F1] border border-[#F1E2E1] text-center space-y-2">
            <Eye className="w-6 h-6 text-[#BE5B6C] mx-auto" />
            <h3 className="font-serif text-lg text-[#171717]">Transparência Total</h3>
            <p className="text-xs text-[#6F6F6F] leading-relaxed">
              Fotos reais, detalhes precisos de composição e políticas claras de trocas e devoluções.
            </p>
          </div>
        </div>

        {/* Privacy Policy Anchor Section */}
        <div id="privacidade" className="pt-12 border-t border-[#EAEAEA] space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#171717]" />
            <h2 className="font-serif text-2xl text-[#171717]">Política de Privacidade</h2>
          </div>
          <div className="text-xs text-[#6F6F6F] space-y-3 leading-relaxed">
            <p>
              A sua privacidade é de extrema importância para nós. Todas as informações fornecidas durante sua navegação e no contato via WhatsApp são utilizadas estritamente para o processamento de pedidos, esclarecimento de dúvidas e atendimento exclusivo.
            </p>
            <p>
              Não compartilhamos, vendemos ou divulgamos seus dados pessoais a terceiros. Seus dados de navegação local (como sacola de compras e favoritos) permanecem armazenados de forma segura e privada diretamente no seu dispositivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
