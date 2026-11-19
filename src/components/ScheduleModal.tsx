import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { ModalSheet } from './ModalSheet';
import { SEVEN_SCHEDULE } from '../config/seven';
import { BusinessStatus } from '../utils/schedule';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: BusinessStatus;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  status,
}) => {
  // Order days starting from Segunda to Domingo or Domingo to Sábado
  // Brazilian commercial order typically: Segunda to Domingo
  const orderedSchedule = [
    ...SEVEN_SCHEDULE.filter((s) => s.dayIndex >= 1),
    ...SEVEN_SCHEDULE.filter((s) => s.dayIndex === 0),
  ];

  return (
    <ModalSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Horários de Funcionamento"
      subtitle="Programação semanal e expediente oficial"
    >
      <div className="space-y-4">
        {/* Live Status Summary Card */}
        <div className="bg-[#1C1E22] border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                status.isOpen
                  ? 'bg-emerald-400 ring-4 ring-emerald-400/20'
                  : 'bg-zinc-500 ring-4 ring-zinc-500/20'
              }`}
            />
            <div>
              <div className="text-sm font-semibold text-[#F5F3EE]">
                {status.statusLabel}
              </div>
              <div className="text-xs text-[#B8BAC0]">
                {status.statusDetail}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wider text-[#B8BAC0]">
              Hoje
            </div>
            <div className="text-xs font-semibold text-[#FF5A16]">
              {status.todaySchedule.displayText}
            </div>
          </div>
        </div>

        {/* Weekly Day-by-Day List */}
        <div className="bg-[#121316] border border-white/5 rounded-xl divide-y divide-white/5 overflow-hidden">
          {orderedSchedule.map((day) => {
            const isToday = day.dayIndex === status.todaySchedule.dayIndex;
            return (
              <div
                key={day.dayIndex}
                className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                  isToday
                    ? 'bg-[#FF5A16]/10 text-[#F5F3EE] font-semibold border-l-2 border-l-[#FF5A16]'
                    : 'text-[#B8BAC0] hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{day.dayName}</span>
                  {isToday && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#FF5A16] text-white">
                      Hoje
                    </span>
                  )}
                </div>
                <div className="font-mono text-xs tabular-nums text-[#F5F3EE]">
                  {day.displayText}
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer / Note */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.03] text-xs text-[#B8BAC0] leading-relaxed">
          <AlertCircle className="w-4 h-4 text-[#FF5A16] shrink-0 mt-0.5" />
          <span>
            Horários informados pelo estabelecimento. Podem variar em feriados e datas comemorativas.
          </span>
        </div>
      </div>
    </ModalSheet>
  );
};
