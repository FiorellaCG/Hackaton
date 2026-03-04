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
    supportedLngs: ['en', 'es', 'fr', 'de', 'zh', 'ja'], // agrega más si quieres
    backend: {
      loadPath: '/locales/{{lng}}.json', // o tu API de traducciones
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;