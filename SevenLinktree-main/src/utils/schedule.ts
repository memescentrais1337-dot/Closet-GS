import { DaySchedule, SEVEN_SCHEDULE, SEVEN_CONFIG } from '../config/seven';

export interface BusinessStatus {
  isOpen: boolean;
  activeShift: DaySchedule;
  todaySchedule: DaySchedule;
  statusLabel: 'Aberto agora' | 'Fechado agora';
  statusDetail: string;
  headerCompactText: string;
  closingTimeFormatted: string;
  openingTimeFormatted: string;
}

/**
 * Returns the current date components in America/Sao_Paulo timezone
 */
export function getSaoPauloDate(date: Date = new Date()): {
  dayIndex: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  hour: number;
  minute: number;
} {
  const timeZone = SEVEN_CONFIG.brand.timezone;
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    });

    const parts = formatter.formatToParts(date);
    let weekdayStr = '';
    let hour = 0;
    let minute = 0;

    for (const part of parts) {
      if (part.type === 'weekday') weekdayStr = part.value;
      if (part.type === 'hour') hour = parseInt(part.value, 10);
      if (part.type === 'minute') minute = parseInt(part.value, 10);
    }

    const weekdayMap: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };

    const dayIndex = weekdayMap[weekdayStr] ?? date.getDay();
    return { dayIndex, hour, minute };
  } catch {
    // Fallback if Intl fails
    return {
      dayIndex: date.getDay(),
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
  }
}

/**
 * Computes whether Seven Lounge & Drinks is currently open or closed,
 * taking into account closing times that spill past midnight (e.g. 02h, 03h, 01h),
 * with exclusive closing time check (e.g. at 02:00:00 it is closed).
 */
export function getSevenBusinessStatus(date: Date = new Date()): BusinessStatus {
  const { dayIndex, hour, minute } = getSaoPauloDate(date);
  const currentTimeInMinutes = hour * 60 + minute;

  // Schedule for current calendar day
  const todaySchedule = SEVEN_SCHEDULE.find((s) => s.dayIndex === dayIndex)!;

  // Previous calendar day (for after-midnight shift)
  const prevDayIndex = (dayIndex + 6) % 7;
  const yesterdaySchedule = SEVEN_SCHEDULE.find((s) => s.dayIndex === prevDayIndex)!;

  // Check 1: Is an after-midnight shift from yesterday still running?
  // If yesterday closes at e.g. 2h (which is 02:00 in the morning of today),
  // and currentTimeInMinutes is < 2 * 60:
  const yesterdayClosingMinutes = yesterdaySchedule.closeHour * 60 + yesterdaySchedule.closeMinute;
  const isYesterdayAfterMidnightShift =
    yesterdaySchedule.closeHour < yesterdaySchedule.openHour &&
    currentTimeInMinutes < yesterdayClosingMinutes;

  if (isYesterdayAfterMidnightShift) {
    const closeH = String(yesterdaySchedule.closeHour).padStart(2, '0');
    const closeM = String(yesterdaySchedule.closeMinute).padStart(2, '0');
    const closeFormatted = yesterdaySchedule.closeMinute > 0 ? `${closeH}h${closeM}` : `${closeH}h`;

    return {
      isOpen: true,
      activeShift: yesterdaySchedule,
      todaySchedule,
      statusLabel: 'Aberto agora',
      statusDetail: `Fecha às ${closeFormatted}`,
      headerCompactText: `Hoje · ${todaySchedule.displayText}`,
      closingTimeFormatted: closeFormatted,
      openingTimeFormatted: `${todaySchedule.openHour}h`,
    };
  }

  // Check 2: Has today's shift started?
  const todayOpeningMinutes = todaySchedule.openHour * 60 + todaySchedule.openMinute;

  // Normal shift today (e.g. starts at 17:00, continues until after midnight)
  if (currentTimeInMinutes >= todayOpeningMinutes) {
    // It started today.
    // Does it close after midnight or on the same day?
    // In our schedule, all days close after midnight (e.g. 01h, 02h, 03h).
    // So if currentTimeInMinutes >= openHour, it is OPEN tonight.
    const closeH = String(todaySchedule.closeHour).padStart(2, '0');
    const closeM = String(todaySchedule.closeMinute).padStart(2, '0');
    const closeFormatted = todaySchedule.closeMinute > 0 ? `${closeH}h${closeM}` : `${closeH}h`;

    return {
      isOpen: true,
      activeShift: todaySchedule,
      todaySchedule,
      statusLabel: 'Aberto agora',
      statusDetail: `Fecha às ${closeFormatted}`,
      headerCompactText: `Hoje · ${todaySchedule.displayText}`,
      closingTimeFormatted: closeFormatted,
      openingTimeFormatted: `${todaySchedule.openHour}h`,
    };
  }

  // Check 3: Closed right now. It will open later today at todayOpeningMinutes.
  const openH = String(todaySchedule.openHour).padStart(2, '0');
  const openM = String(todaySchedule.openMinute).padStart(2, '0');
  const openFormatted = todaySchedule.openMinute > 0 ? `${openH}h${openM}` : `${openH}h`;

  return {
    isOpen: false,
    activeShift: todaySchedule,
    todaySchedule,
    statusLabel: 'Fechado agora',
    statusDetail: `Abre hoje às ${openFormatted}`,
    headerCompactText: `Hoje · ${todaySchedule.displayText}`,
    closingTimeFormatted: `${todaySchedule.closeHour}h`,
    openingTimeFormatted: openFormatted,
  };
}
