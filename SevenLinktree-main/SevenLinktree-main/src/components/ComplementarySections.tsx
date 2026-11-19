import React, { useState } from 'react';
import { Clock, ChevronDown, AlertCircle } from 'lucide-react';
import { SEVEN_SCHEDULE } from '../config/seven';
import { BusinessStatus } from '../utils/schedule';

interface ComplementarySectionsProps {
  status: BusinessStatus;
}

export const ComplementarySections: React.FC<ComplementarySectionsProps> = ({ status }) => {
  const [isOpen, setIsOpen] = useState(false);

  const orderedSchedule = [
    ...SEVEN_SCHEDULE.filter((s) => s.dayIndex >= 1),
    ...SEVEN_SCHEDULE.filter((s) => s.dayIndex === 0),
  ];

  return (
    <div className="w-full">
      {/* Accordion: Horários de funcionamento */}
      <div className="rounded-2xl bg-[#151619] border border-white/10 overflow-hidden transition-all duration-200">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-between w-full p-4 text-left hover:bg-[#1B1D22] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A16]"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF5A16]/10 text-[#FF5A16] flex items-center justify-center border border-[#FF5A16]/20 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#F5F3EE] tracking-tight">
                Horários de funcionamento
              </div>
              <div className="text-[11px] text-[#B8BAC0] flex items-center gap-1.5 mt-0.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    status.isOpen ? 'bg-emerald-400' : 'bg-zinc-500'
                  }`}
                />
                <span>Hoje: {status.todaySchedule.displayText}</span>
              </div>
            </div>
          </div>

          <div
            className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[#B8BAC0] transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#F5F3EE]' : ''
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>

        {isOpen && (
          <div className="px-4 pb-4 pt-1 border-t border-white/5 space-y-3 animate-in fade-in duration-200">
            <div className="divide-y divide-white/5 rounded-xl bg-[#101114] border border-white/5 overflow-hidden">
              {orderedSchedule.map((day) => {
                const isToday = day.dayIndex === status.todaySchedule.dayIndex;
                return (
                  <div
                    key={day.dayIndex}
                    className={`flex items-center justify-between px-3.5 py-2.5 text-xs ${
                      isToday
                        ? 'bg-[#FF5A16]/10 font-bold text-[#F5F3EE]'
                        : 'text-[#B8BAC0]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{day.dayName}</span>
                      {isToday && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#FF5A16] text-white">
                          Hoje
                        </span>
                      )}
                    </div>
                    <span className="font-mono tabular-nums text-[#F5F3EE]">
                      {day.displayText}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-start gap-2 text-[11px] text-[#B8BAC0]/80 px-1 leading-relaxed">
              <AlertCircle className="w-3.5 h-3.5 text-[#FF5A16] shrink-0 mt-0.5" />
              <span>
                Horários informados pelo estabelecimento. Podem variar em feriados.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
