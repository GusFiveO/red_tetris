import React, { ComponentType } from 'react';
import { useLocation } from 'react-router-dom';
import { Error } from '../components/Error';
import { Game } from '../pages/Game';
import { Login } from '../pages/Login';
import { checkHash } from '../utils/checkHash';

export const withAuth = (Component: ComponentType<Record<string, any>>) => {
  const WithAuth: React.FC = (props) => {
    const { hash } = useLocation();

    const refreshToken = document.cookie.includes('refreshToken');
    if (hash.length !== 0) {
      if (checkHash(hash)) {
        return <Game hash={hash} />;
      } else {
        return (
          <Error
            message={
              'Please choose a correct hashcode format to join/create room'
            }
          />
        );
      }
    } else if (!refreshToken) {
      return <Login />;
    }

    return <Component {...props} />;
  };

  return WithAuth;
};
