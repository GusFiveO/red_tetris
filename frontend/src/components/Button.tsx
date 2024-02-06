import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<Props> = ({ ...props }) => {
  return <button {...props}></button>;
};
