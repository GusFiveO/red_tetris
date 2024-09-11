import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import { Home } from './pages/Home.tsx';
import { Game } from './pages/Game.tsx'
import store from './store/store.ts';
import { PageNotFound } from './pages/PageNotFound';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:room/:player_name' element={<Game />} />
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
