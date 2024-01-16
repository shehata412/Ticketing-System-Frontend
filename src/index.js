import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import Login from './pages/login';
import Tickets from './pages/tickets';
import CreateTicket from './pages/createticket';
import UpdateTicket from './pages/updateTicket';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/tickets" element={<Tickets/>} />
    <Route path="/createticket" element={<CreateTicket/>} />
    <Route path="/ticket/:id" element={<UpdateTicket/>} />
   </Routes>
  </BrowserRouter>
);

reportWebVitals();
