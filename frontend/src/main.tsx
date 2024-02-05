import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Login } from './pages/Login.tsx';
import { Redirect } from './pages/Redirect.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App/>}/> */}
        <Route path='/' element={<Login />} />
        <Route path='/redirect' element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
