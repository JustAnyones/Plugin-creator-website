import i18next from 'i18next';
//import enNs1 from './locales/en/ns1.json';
//import enNs2 from './locales/en/ns2.json';
//import enFallback from './locales/en/fallback.json';
//import deNs1 from './locales/de/ns1.json';
//import deNs2 from './locales/de/ns2.json';
import stringsEn from './locales/en/strings.json';

export const defaultNS = 'strings';
export const fallbackNS = 'fallback';

i18next.init({
  debug: true,
  fallbackLng: 'en',
  defaultNS,
  fallbackNS,
  resources: {
    en: {
      strings: stringsEn,
    },
  },
});


export default i18next;