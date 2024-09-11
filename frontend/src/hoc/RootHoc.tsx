import React, { ComponentType } from 'react';

export const withAuth = (Component: ComponentType<Record<string, any>>) => {
  const WithAuth: React.FC = (props) => {

       return <Component {...props} />;
  };

  return WithAuth;
};
