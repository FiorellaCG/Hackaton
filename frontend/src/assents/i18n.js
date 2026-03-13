// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'es', // Set Spanish as default
    fallbackLng: 'es',
    supportedLngs: ['en', 'es'],
    backend: {
      loadPath: (import.meta.env.MODE === 'production' 
        ? (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '/static') : '/static')
        : '') + '/locales/{{lng}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    initImmediate: false,
  });

export default i18n;