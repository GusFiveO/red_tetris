import React, { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const withAuth = (Component: ComponentType<Record<string, any>>) => {
  const WithAuth: React.FC = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const refreshToken = document.cookie.includes('refreshToken');

      if (!refreshToken) {
        navigate('/login');
      }
    }, [navigate]);

    return <Component {...props} />;
  };

  return WithAuth;
};

// export default withAuth;
