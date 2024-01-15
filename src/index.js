import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import Login from './login';
import Tickets from './tickets';
import CreateTicket from './createticket';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/tickets" element={<Tickets/>} />
    <Route path="/createticket" element={<CreateTicket/>} />
   </Routes>
  </BrowserRouter>
);

reportWebVitals();
