import localAmbianceBanner from '../assets/images/seven_lounge_ambiance_1794506023253.jpg';

/**
 * Configuration for Seven Lounge & Drinks
 * Centralized repository of all real URLs, location coordinates, schedules, wifi credentials, and media.
 */

export interface DaySchedule {
  dayIndex: number; // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  dayName: string;
  dayShort: string;
  openHour: number; // e.g. 17
  openMinute: number; // e.g. 0
  closeHour: number; // e.g. 2 (next day) or 1
  closeMinute: number;
  displayText: string; // "17h às 02h"
}

export const SEVEN_SCHEDULE: DaySchedule[] = [
  {
    dayIndex: 0,
    dayName: 'Domingo',
    dayShort: 'Dom',
    openHour: 15,
    openMinute: 0,
    closeHour: 1, // 01:00 (next day morning)
    closeMinute: 0,
    displayText: '15h às 01h',
  },
  {
    dayIndex: 1,
    dayName: 'Segunda-feira',
    dayShort: 'Seg',
    openHour: 17,
    openMinute: 0,
    closeHour: 2, // 02:00 (next day morning)
    closeMinute: 0,
    displayText: '17h às 02h',
  },
  {
    dayIndex: 2,
    dayName: 'Terça-feira',
    dayShort: 'Ter',
    openHour: 17,
    openMinute: 0,
    closeHour: 2,
    closeMinute: 0,
    displayText: '17h às 02h',
  },
  {
    dayIndex: 3,
    dayName: 'Quarta-feira',
    dayShort: 'Qua',
    openHour: 17,
    openMinute: 0,
    closeHour: 2,
    closeMinute: 0,
    displayText: '17h às 02h',
  },
  {
    dayIndex: 4,
    dayName: 'Quinta-feira',
    dayShort: 'Qui',
    openHour: 17,
    openMinute: 0,
    closeHour: 2,
    closeMinute: 0,
    displayText: '17h às 02h',
  },
  {
    dayIndex: 5,
    dayName: 'Sexta-feira',
    dayShort: 'Sex',
    openHour: 17,
    openMinute: 0,
    closeHour: 3,
    closeMinute: 0,
    displayText: '17h às 03h',
  },
  {
    dayIndex: 6,
    dayName: 'Sábado',
    dayShort: 'Sáb',
    openHour: 17,
    openMinute: 0,
    closeHour: 3,
    closeMinute: 0,
    displayText: '17h às 03h',
  },
];

export const SEVEN_CONFIG = {
  brand: {
    name: 'SEVEN LOUNGE & DRINKS',
    shortName: 'Seven',
    tagline: 'Seu próximo encontro é aqui.',
    supportText: 'Drinks, sabores e bons momentos na Seven.',
    locationLabel: 'Celina Park · Goiânia',
    fullAddress: 'Seven Lounge & Drinks - Residencial Celina Park, Goiânia - GO, Brasil',
    coordinates: {
      latitude: -16.7120029,
      longitude: -49.3199722,
    },
    timezone: 'America/Sao_Paulo',
  },

  media: {
    officialLogoLocal: `${import.meta.env.BASE_URL}assets/aistudio/Design_sem_nome__27__2a5cda9c.png`,
    officialLogoUrl: 'https://dg-media.com.br/avatars/avatar_703514.png?v=1738753626',
    officialBannerWebp: 'https://dg-media.com.br/banners/banner_703514.webp?v=1753374648',
    officialBannerPng: 'https://dg-media.com.br/banners/banner_703514.png?v=1753374648',
    localAmbianceBanner,
    clicaeLogo: `${import.meta.env.BASE_URL}assets/aistudio/870182333_18104572946333879_3446317080299632352_n__1__effd0cad.jpg`,
  },

  links: {
    // Easily configurable cardápio destination
    menu: 'https://sevenlounge.com.br/cardapio',

    instagram: 'https://www.instagram.com/sevenloungedrinks/',

    whatsapp: {
      phone: '+55 62 98210-7212',
      displayPhone: '(62) 98210-7212',
      url: `https://wa.me/5562982107212?text=${encodeURIComponent(
        'Olá! Vim pelo link da bio da Seven e gostaria de mais informações.'
      )}`,
    },

    reviews: {
      url: 'https://search.google.com/local/writereview?placeid=ChIJgUKowfr3XpMRX3vcF1yQFQw',
      label: 'Avaliar no Google',
    },

    location: {
      googleMaps: 'https://www.google.com/maps/search/?api=1&query=-16.7120029%2C-49.3199722',
      waze: 'https://www.waze.com/ul?ll=-16.7120029%2C-49.3199722&navigate=yes&zoom=17',
      uber: 'https://m.uber.com/ul/?client_id=WN_WM5dh-j9OPWM9vE9lRiSTivgGP0HB&action=setPickup&pickup=my_location&dropoff[latitude]=-16.7120029&dropoff[longitude]=-49.3199722&dropoff[nickname]=Seven%20Lounge%20Drinks&dropoff[formatted_address]=Seven%20Lounge%20%26%20Drinks%20-%20Residencial%20Celina%20Park%2C%20Goi%C3%A2nia%20-%20GO%2C%20Brasil',
    },

    clicae: 'https://www.instagram.com/clicaebio/',
  },

  wifi: {
    network: 'Seven_Bar_Clientes',
    password: 'seven2020',
  },
} as const;
