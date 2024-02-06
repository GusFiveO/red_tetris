import React, { ComponentType, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const withAuth = (Component: ComponentType<Record<string, any>>) => {
  const WithAuth: React.FC = (props) => {
    const navigate = useNavigate();
    const { hash } = useLocation();

    useEffect(() => {
      const refreshToken = document.cookie.includes('refreshToken');
      console.log(hash);
      if (!refreshToken) {
        navigate('/login');
      }
    }, [navigate, hash]);

    return <Component {...props} />;
  };

  return WithAuth;
};

// export default withAuth;
