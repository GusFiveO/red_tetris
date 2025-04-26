import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Game } from './pages/Game.tsx';
import { Home } from './pages/Home.tsx';
import { PageNotFound } from './pages/PageNotFound';
import store from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:room/:playerName' element={<Game />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
