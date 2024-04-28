import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import enTranslations from './translations/en.json';
import arTranslations from './translations/ar.json';
import './index.css';
import Login from './pages/login';
import Tickets from './pages/tickets';
import CreateTicket from './pages/createticket';
import UpdateTicket from './pages/updateTicket';
import reportWebVitals from './reportWebVitals';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      ar: {
        translation: arTranslations
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <I18nextProvider i18n={i18n}>
  <Router>
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/tickets" element={<Tickets/>} />
    <Route path="/createticket" element={<CreateTicket/>} />
    <Route path="/ticket/:id" element={<UpdateTicket/>} />
   </Routes>
  </Router>
  </I18nextProvider>
);

reportWebVitals();
